import jwtDecode, { JwtPayload } from 'jwt-decode';
import Router from 'next/router';
import { createContext } from 'react';

import { ViewerDocument, ViewerQuery, ViewerQueryVariables } from '../apis';
import { SIGN_IN_URL } from '../constants';
import { BitBanPage } from '../interfaces';
import { getComponentDisplayName } from '../utils';
import { getAccessToken } from '../variables';

// Login State
type LoginState =
  | {
      isLoggedIn: false;
    }
  | {
      isLoggedIn: true;
      viewer: ViewerQuery['viewer'];
    };

/**
 * Login State Context
 */
export const LoginStateContext = createContext({} as LoginState);
export const { Provider: LoginStateProvider, Consumer: LoginStateConsumer } = LoginStateContext;

/**
 * Viewer HOC
 *
 * @param Page
 * @returns
 */
export function withViewer(Page: BitBanPage<any, any>) {
  const ViewerHoc: BitBanPage<LoginState, any> = ({ isLoggedIn, viewer, ...props }) => {
    // Render
    return (
      <LoginStateProvider value={{ isLoggedIn, viewer }}>
        <Page {...props} />
      </LoginStateProvider>
    );
  };

  ViewerHoc.displayName = getComponentDisplayName(Page, 'ViewerHoc');

  ViewerHoc.getInitialProps = async context => {
    const pageProps = Page.getInitialProps ? await Page.getInitialProps(context) : {};

    const accessToken =
      typeof window === 'undefined' ? context.serverAccessToken : getAccessToken();

    if (accessToken) {
      const { sub } = jwtDecode<JwtPayload>(accessToken);

      const {
        data: { viewer },
      } = await context.apolloClient.query<ViewerQuery, ViewerQueryVariables>({
        query: ViewerDocument,
        variables: {
          id: sub as string,
        },
      });

      return {
        ...pageProps,
        isLoggedIn: true,
        viewer,
      };
    }

    if (context.res) {
      context.res.writeHead(303, { Location: SIGN_IN_URL });
      context.res.end();
    } else {
      await Router.replace(SIGN_IN_URL);
    }

    return {
      ...pageProps,
      isLoggedIn: false,
    };
  };

  return ViewerHoc;
}

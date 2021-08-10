//
// NOTO: This hook implemented to be in use in `../pages/_app.tsx`
//

import { ApolloProvider } from '@apollo/client';
import { IncomingMessage } from 'http';

import { RegeetApp } from '../interfaces';
import { initApolloClient } from '../states';
import {
  fetchAccessToken,
  getAccessTokenFromResponse,
  getComponentDisplayName,
  hasSentServerResponse,
  isServerSide,
} from '../utils';
import { setAccessToken } from '../variables';

// With Apollo Options
type WithApolloOptions = {
  ssrMode?: boolean;
};

/**
 * Retrieve Access Token
 *
 * @param request
 * @returns
 */
async function getServerAccessToken(request?: IncomingMessage) {
  if (request?.headers.cookie) {
    const { parse } = await import('cookie');
    const { 'refresh-token': refreshToken } = parse(request.headers.cookie);

    if (refreshToken) {
      return await getAccessTokenFromResponse(
        await fetchAccessToken({ cookie: `refresh-token=${refreshToken}` })
      );
    }
  }
}

/**
 * Apollo HOC
 *
 * @param options
 * @returns
 */
export function withApollo({ ssrMode = true }: WithApolloOptions = {}) {
  return (Component: RegeetApp) => {
    const ApolloHoc = ({ apolloState, apolloClient, serverAccessToken, ...props }: any) => {
      if (!isServerSide() && serverAccessToken) {
        setAccessToken(serverAccessToken);
      }

      return (
        <ApolloProvider
          client={apolloClient ?? initApolloClient({ state: apolloState, serverAccessToken })}
        >
          <Component {...props} />
        </ApolloProvider>
      );
    };

    ApolloHoc.displayName = getComponentDisplayName(Component, 'ApolloHoc');

    if (ssrMode || Component.getInitialProps) {
      ApolloHoc.getInitialProps = async appContext => {
        const { AppTree, ctx } = appContext;

        if (isServerSide()) {
          ctx.serverAccessToken = await getServerAccessToken(ctx.req);
        }

        ctx.apolloClient = initApolloClient({ serverAccessToken: ctx.serverAccessToken });

        const pageProps = Component.getInitialProps
          ? await Component.getInitialProps(appContext)
          : {};

        if (hasSentServerResponse(ctx.res)) {
          return pageProps;
        }

        if (isServerSide() && ssrMode) {
          const { getDataFromTree } = await import('@apollo/client/react/ssr');
          await getDataFromTree(
            <AppTree
              {...pageProps}
              apolloClient={ctx.apolloClient}
              serverAccessToken={ctx.serverAccessToken}
            />
          );
        }

        return {
          ...pageProps,
          apolloState: ctx.apolloClient.cache.extract(),
          serverAccessToken: ctx.serverAccessToken,
        };
      };
    }

    return ApolloHoc;
  };
}

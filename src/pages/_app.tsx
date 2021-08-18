import { css, Global as StylesProvider } from '@emotion/react';
import NextApp from 'next/app';
import { Fragment } from 'react';
import tw, { GlobalStyles as TwStyles } from 'twin.macro';

import { withApollo } from '../higher-orders';
import { BitBanApp } from '../interfaces';

/**
 * Styles
 */
const styles = {
  _: css`
    html {
      ${tw`h-full`}
    }

    body {
      ${tw`
        h-full
        bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
        text-base
      `}

      & > div:first-of-type {
        ${tw`min-h-full flex flex-col items-center justify-center`}
      }
    }

    a {
      ${tw`text-brand-primary`}
    }
  `,
};

/**
 * App
 */
const App: BitBanApp = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <TwStyles />
      <StylesProvider styles={styles._} />
      <Component {...pageProps} />
    </Fragment>
  );
};

/**
 * Get Initial Props
 *
 * @param appContext
 * @returns
 */
App.getInitialProps = async appContext => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};

// Default Export
export default withApollo()(App);

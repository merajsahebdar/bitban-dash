import NextApp from 'next/app';

import { withApollo } from '../higher-orders';
import { BitBanApp } from '../interfaces';

/**
 * App
 */
const App: BitBanApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
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

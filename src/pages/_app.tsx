import { NextPage } from 'next';
import { AppProps } from 'next/app';

/**
 * Regeet Dash App
 */
const RegeetDashApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// Default Export
export default RegeetDashApp;

import { Fragment } from 'react';

import { withViewer } from '../higher-orders';
import { BitBanPage } from '../interfaces';

/**
 * Home
 */
const Home: BitBanPage = () => {
  return <Fragment />;
};

// Default Export
export default withViewer(Home);

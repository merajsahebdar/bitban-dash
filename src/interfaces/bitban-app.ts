import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';

import { BitBanPageContext } from './bitban-page';

/**
 * BitBan App Context
 */
export interface BitBanAppContext extends AppContext {
  ctx: BitBanPageContext;
}

/**
 * BitBan App
 */
export type BitBanApp<IP = AppInitialProps, P = AppProps> = NextComponentType<
  BitBanAppContext,
  IP,
  P
>;

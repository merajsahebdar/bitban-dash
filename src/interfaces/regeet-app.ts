import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';

import { RegeetPageContext } from './regeet-page';

/**
 * Regeet App Context
 */
export interface RegeetAppContext extends AppContext {
  ctx: RegeetPageContext;
}

/**
 * Regeet App
 */
export type RegeetApp<IP = AppInitialProps, P = AppProps> = NextComponentType<
  RegeetAppContext,
  IP,
  P
>;

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextComponentType, NextPageContext } from 'next';

/**
 * Regeet Page Context
 */
export interface RegeetPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  serverAccessToken?: string;
}

/**
 * Regeet Page
 */
export type RegeetPage<IP = {}, P = {}> = NextComponentType<RegeetPageContext, IP, P>;

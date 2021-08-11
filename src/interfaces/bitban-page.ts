import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextComponentType, NextPageContext } from 'next';

/**
 * BitBan Page Context
 */
export interface BitBanPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  serverAccessToken?: string;
}

/**
 * BitBan Page
 */
export type BitBanPage<IP = {}, P = {}> = NextComponentType<BitBanPageContext, IP, P>;

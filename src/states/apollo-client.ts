import 'isomorphic-unfetch';

import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

import { API_URI } from '../constants';
import { fetchAccessToken, getAccessTokenFromResponse } from '../utils';
import { getAccessToken, isAccessTokenExpired, setAccessToken } from '../variables';
import { createApolloCache } from './apollo-cache';

// Create Client Options
type CreateClientOptions = {
  state?: NormalizedCacheObject;
  serverAccessToken?: string;
};

// Client
export let client: ApolloClient<NormalizedCacheObject>;

/**
 * Create Apollo Client
 *
 * @param options
 * @returns
 */
function createApolloClient({ state, serverAccessToken }: CreateClientOptions) {
  const tokenRefreshLink = new TokenRefreshLink({
    isTokenValidOrUndefined: () =>
      !isAccessTokenExpired() || typeof getAccessToken() === 'undefined',
    fetchAccessToken,
    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },
    handleResponse: () => getAccessTokenFromResponse,
  });

  const authLink = setContext((_, { headers }) => {
    const accessToken = typeof window === 'undefined' ? serverAccessToken : getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  const httpLink = createHttpLink({
    uri: API_URI,
    credentials: 'include',
  });

  return new ApolloClient({
    link: ApolloLink.from([tokenRefreshLink, authLink, httpLink]),
    cache: createApolloCache(state ?? {}),
    ssrMode: typeof window === 'undefined',
  });
}

/**
 * Initialize Apollo Client
 *
 * @param options
 * @returns
 */
export function initApolloClient(options: CreateClientOptions) {
  if (typeof window === 'undefined') {
    return createApolloClient(options);
  }

  if (!client) {
    client = createApolloClient(options);
  }

  return client;
}

import { InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import { reactiveAuthState } from '../variables';

/**
 * Creates an instance of `InMemoryCache`.
 *
 * @param state
 * @returns
 */
export function createApolloCache(state: NormalizedCacheObject) {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          authState: {
            read: () => reactiveAuthState(),
          },
        },
      },
    },
  }).restore(state);
}

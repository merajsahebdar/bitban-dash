import { API_URI } from '../constants';

/**
 * Fetch Access Token
 *
 * @param headers
 * @returns
 */
export function fetchAccessToken(headers: HeadersInit = {}) {
  return fetch(API_URI, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'refreshToken',
      query: 'mutation refreshToken { refreshToken }',
    }),
  });
}

/**
 * Get access token from response.
 *
 * @param response
 * @returns
 */
export async function getAccessTokenFromResponse(response: Response): Promise<string | undefined> {
  try {
    return (await response.json()).data.refreshToken;
  } catch {
    // ...
  }
}

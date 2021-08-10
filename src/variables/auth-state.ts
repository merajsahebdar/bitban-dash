import jwtDecode, { JwtPayload } from 'jwt-decode';

import { AuthState } from '../apis';
import { makeVar } from '../utils';

export const reactiveAuthState = makeVar<AuthState>({ isLoggedIn: false });

/**
 * Retrieve the access token from auth state.
 *
 * @returns
 */
export function getAccessToken() {
  const authState = reactiveAuthState();
  if ('accessToken' in authState) {
    return authState.accessToken;
  }
}

/**
 * Set the access token into auth state.
 *
 * @returns
 */
export function setAccessToken(accessToken: string) {
  const { sub } = jwtDecode<JwtPayload>(accessToken);
  reactiveAuthState({
    accessToken,
    userId: sub as string,
  });
}

/**
 * Check whether the token is expired or not.
 *
 * @returns
 */
export function isAccessTokenExpired() {
  const accessToken = getAccessToken();

  if (accessToken) {
    const { exp } = jwtDecode<JwtPayload>(accessToken);

    if (Date.now() < exp * 1000) {
      return true;
    }
  }

  return false;
}

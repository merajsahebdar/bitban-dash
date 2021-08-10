import { useContext } from 'react';

import { LoginStateContext } from '../higher-orders';

/**
 * Use Viewer Hook
 *
 * @returns
 */
export function useViewer() {
  const state = useContext(LoginStateContext);

  if (state.isLoggedIn) {
    return state.viewer;
  }
}

import { ServerResponse } from 'node:http';

import { isServerSide } from './is-server-side';

/**
 * Whether the server has sent any response or not.
 *
 * @param response
 * @returns
 */
export function hasSentServerResponse(response?: ServerResponse) {
  return isServerSide() && (response?.headersSent || response?.writableEnded);
}

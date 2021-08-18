import { useEffect, useLayoutEffect } from 'react';

import { isServerSide } from './is-server-side';

/**
 *
 */
export const useEnhancedEffect = isServerSide() ? useEffect : useLayoutEffect;

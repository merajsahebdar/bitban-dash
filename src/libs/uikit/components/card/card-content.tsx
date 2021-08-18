import { forwardRef } from 'react';
import tw from 'twin.macro';

import { DivHTMLAttributes } from '../../types';

/**
 * Card Content
 */
export const CardContent = forwardRef<HTMLDivElement, DivHTMLAttributes>(function CardContent(
  props,
  forwardedRef
) {
  return <div {...props} css={tw`py-3 px-4`} ref={forwardedRef} />;
});

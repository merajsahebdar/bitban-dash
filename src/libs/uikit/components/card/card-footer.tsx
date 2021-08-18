import { forwardRef, useMemo } from 'react';
import tw from 'twin.macro';

import { DivHTMLAttributes } from '../../types';

/**
 * Card Footer
 */
export const CardFooter = forwardRef<HTMLDivElement, DivHTMLAttributes>(function CardFooter(
  props,
  forwardedRef
) {
  return <footer {...props} css={tw`py-3 px-4`} ref={forwardedRef} />;
});

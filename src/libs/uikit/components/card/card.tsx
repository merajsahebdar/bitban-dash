import { forwardRef } from 'react';
import tw from 'twin.macro';

import { DivHTMLAttributes } from '../../types';

/**
 * Card
 */
export const Card = forwardRef<HTMLDivElement, DivHTMLAttributes>(function Card(
  props,
  forwardedRef
) {
  return (
    <div
      {...props}
      css={tw`bg-white dark:bg-gray-800 shadow dark:shadow-none rounded-md`}
      ref={forwardedRef}
    />
  );
});

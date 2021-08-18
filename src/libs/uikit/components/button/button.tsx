import { useMemo } from 'react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import tw from 'twin.macro';

/**
 * Button Props
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

/**
 * Button
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  forwardedRef
) {
  return (
    <button
      {...props}
      css={tw`py-1.5 px-4 bg-brand-primary text-gray-50 dark:text-gray-900 rounded-md font-semibold text-base`}
      ref={forwardedRef}
    />
  );
});

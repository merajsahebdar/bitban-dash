import { forwardRef, ReactNode } from 'react';
import tw from 'twin.macro';

import { DivHTMLAttributes } from '../../types';

/**
 * Card Header Props
 */
type CardHeaderProps = DivHTMLAttributes & {
  title: ReactNode;
  subtitle?: ReactNode;
};

/**
 * Card Header
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  props,
  forwardedRef
) {
  const { title, subtitle, ...other } = props;
  return (
    <header {...other} css={tw`py-3 px-4`} ref={forwardedRef}>
      <p css={tw`font-semibold text-xl dark:text-gray-200`}>{title}</p>
      {subtitle && <p css={tw`text-sm`}>{subtitle}</p>}
    </header>
  );
});

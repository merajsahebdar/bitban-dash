import { css, Interpolation, Theme } from '@emotion/react';
import { ReactNode, useMemo } from 'react';
import { forwardRef } from 'react';
import { FC } from 'react';
import tw from 'twin.macro';

/**
 * Grid Classes
 */
export const useClasses = () =>
  useMemo(
    () => ({
      container: css`
        ${tw`-mx-2 flex flex-row`}

        & > div {
          ${tw`px-2`}
        }
      `,
      containerItems_start: tw`items-start`,
      containerItems_center: tw`items-center`,
      containerItems_end: tw`items-end`,
      item_pushed: tw`ml-auto`,
    }),
    []
  );

/**
 * Grid Props
 */
export type GridProps = {
  children?: ReactNode;
};

/**
 * Grid Container Props
 */
export type GridContainerProps = GridProps & {
  container: true;
  alignItems?: 'start' | 'center' | 'end';
};

/**
 * Grid Item Props
 */
export type GridItemProps = GridProps & {
  item: true;
  push?: boolean;
};

/**
 * Grid
 */
export const Grid = forwardRef<HTMLDivElement, GridContainerProps | GridItemProps>(function Grid(
  props,
  forwardedRef
) {
  const classes = useClasses();

  if ('item' in props) {
    const { item, push = false, ...other } = props;
    return <div {...other} css={push && classes.item_pushed} ref={forwardedRef} />;
  }

  const { alignItems = 'center', container, ...other } = props;
  return <div {...other} css={[classes.container, classes[`containerItems_${alignItems}`]]} />;
});

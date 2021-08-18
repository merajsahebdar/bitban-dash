import { css } from '@emotion/react';
import { ChangeEvent, EventHandler, FocusEvent, FormEvent, useMemo } from 'react';
import { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { forwardRef } from 'react';
import tw, { theme } from 'twin.macro';

import { useEnhancedEffect } from '../../../../utils';

/**
 * Styles
 */
const useClasses = ({ focused = false, filled = false }) => {
  return useMemo(() => {
    const root = css`
      ${tw`
        w-full my-2 relative
        transition transition-colors transition-shadow
        bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-md
      `}

      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }

      ${focused &&
      css`
        ${tw`dark:border-gray-500`}

        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.0625);
      `}
    `;

    const label = css`
      ${tw`
        absolute
        transition-transform
        transform origin-top-left translate-y-2.5 translate-x-2 scale-100
        pointer-events-none select-none
        dark:text-gray-200
      `}

      ${(filled || focused) && tw`translate-y-1 scale-75`}
    `;

    const input = css`
      ${tw`
        w-full pt-5 pb-1 px-2
        bg-transparent dark:text-gray-200 focus:outline-none
        font-mono text-base
      `}
    `;

    return {
      root,
      label,
      input,
    };
  }, [filled, focused]);
};

/**
 * Input Props
 */
type InputProps = {
  defaultValue?: string | number | readonly string[];
  label: ReactNode;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  type?: React.InputHTMLAttributes<unknown>['type'];
  value?: string | number | readonly string[];
};

/**
 * Form Control
 */
const useFormControl = props => {
  const [focused, setFocused] = useState(false);

  const [filled, setFilled] = useState(() => {
    if (isFilled(props, true)) {
      return true;
    }

    return false;
  });

  const onFilled = useCallback(() => {
    setFilled(true);
  }, []);

  const onEmpty = useCallback(() => {
    setFilled(false);
  }, []);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return {
    focused,
    filled,
    onFilled,
    onEmpty,
    onFocus,
    onBlur,
  };
};

/**
 * Input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, forwardedRef) {
  const { label, onBlur, onChange, onFocus, value, ...other } = props;

  const formControl = useFormControl(props);

  const checkDirty = useCallback(
    props => {
      if (isFilled(props)) {
        formControl.onFilled();
      } else {
        formControl.onEmpty();
      }
    },
    [formControl]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      formControl.onBlur();

      if (onBlur) {
        onBlur(event);
      }
    },
    [formControl, onBlur]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      checkDirty({
        value: event.target.value,
      });

      if (onChange) {
        onChange(event);
      }
    },
    [checkDirty, onChange]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      formControl.onFocus();

      if (onFocus) {
        onFocus(event);
      }
    },
    [formControl, onFocus]
  );

  useEnhancedEffect(() => {
    checkDirty({ value });
  }, [checkDirty, value]);

  const classes = useClasses({
    filled: formControl.filled,
    focused: formControl.focused,
  });

  return (
    <div css={classes.root}>
      <label css={classes.label}>{label}</label>
      <input
        {...other}
        css={classes.input}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={forwardedRef}
        value={value}
      />
    </div>
  );
});

/**
 * Supports determination of isControlled().
 * Controlled input accepts its current value as a prop.
 *
 * @see https://facebook.github.io/react/docs/forms.html#controlled-components
 * @param value
 * @returns {boolean}
 */
function hasValue(value: unknown): boolean {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

/**
 * Determine if field is empty or filled.
 * Response determines if label is presented above field or as placeholder.
 *
 * @param props
 * @param ssr
 * @returns {boolean}
 */
function isFilled(props: Pick<InputProps, 'defaultValue' | 'value'>, ssr = false): boolean {
  return (
    (hasValue(props.value) && props.value !== '') ||
    (ssr && hasValue(props.defaultValue) && props.defaultValue !== '')
  );
}

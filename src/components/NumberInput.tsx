import React, { RefObject, useRef, useLayoutEffect, useMemo } from 'react';
import { TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { round } from 'lodash';

export interface NumberInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value?: number;
  precision?: number;
  onChangeText?: (value: number) => void;
  inputRef?: RefObject<TextInput>;
  enableNegtive?: boolean;
}

export default function NumberInput(props: NumberInputProps) {
  const { precision, inputRef, value, onChangeText, onBlur, ...restProps } = props;

  let ref = useRef<TextInput>(null);

  if (inputRef !== undefined) {
    ref = inputRef;
  }

  const text = value === undefined ? '' : round(value, precision).toString();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValue = useMemo(() => text, []);

  const handleChange = (value: string) => {
    const num = +value;

    if (onChangeText && !isNaN(num) && Math.abs(num) <= 10 ** 8) {
      onChangeText(round(num, precision));
    }
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(e);
    }

    if (ref.current) {
      ref.current.setNativeProps({ text });
    }
  };

  useLayoutEffect(() => {
    if (ref.current && ref.current.isFocused() === false) {
      ref.current.setNativeProps({ text });
    }
  }, [text]);

  return (
    <TextInput
      ref={ref}
      {...restProps}
      onBlur={handleBlur}
      defaultValue={defaultValue}
      onChangeText={handleChange}
      returnKeyType='done'
      keyboardType={precision === 0 ? 'number-pad' : 'decimal-pad'}
    />
  );
}

NumberInput.defaultProps = {
  precision: 3,
  value: 0
};

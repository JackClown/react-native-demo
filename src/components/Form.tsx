import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from './Theme';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Form(props: Props) {
  const { children, style } = props;
  const { color } = useTheme();

  return (
    <KeyboardAvoidingView
      style={[{ backgroundColor: color.background, flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {children}
    </KeyboardAvoidingView>
  );
}

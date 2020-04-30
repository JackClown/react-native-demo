import React, { ReactNode, useContext } from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';

import { useTheme } from './Theme';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Form(props: Props) {
  const { children, style } = props;
  const { color } = useTheme();

  const height = useContext(HeaderHeightContext);

  return (
    <KeyboardAvoidingView
      style={[{ backgroundColor: color.background, flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={height || 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from 'react-native';

import styles from '../config/styles';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Form(props: Props) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, props.style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
}

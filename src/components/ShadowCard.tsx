import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle, View, TouchableHighlight } from 'react-native';

import { whitespace, whitespace_lg } from '@/config/theme';
import { scaleSize } from '@/utils/scale';
import { useTheme } from './Theme';

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  size: 'lg' | 'sm' | 'md';
  onPress?: () => void;
}

export default function ShadowCard(props: Props) {
  const { style, children, size, onPress } = props;

  const { color } = useTheme();

  return (
    <TouchableHighlight underlayColor={color.background} onPress={onPress}>
      <View style={[styles.container, styles[size], { backgroundColor: color.foreground }, style]}>{children}</View>
    </TouchableHighlight>
  );
}

ShadowCard.defaultProps = {
  size: 'md'
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  lg: ViewStyle;
  md: ViewStyle;
  sm: ViewStyle;
}>({
  container: {
    borderRadius: scaleSize(8),
    shadowColor: 'rgb(84, 96, 90)',
    shadowOpacity: 0.14,
    shadowRadius: scaleSize(10)
  },
  lg: {
    paddingVertical: scaleSize(40),
    paddingHorizontal: whitespace_lg
  },
  md: {
    paddingVertical: whitespace_lg,
    paddingHorizontal: whitespace_lg
  },
  sm: {
    paddingVertical: whitespace,
    paddingHorizontal: whitespace_lg
  }
});

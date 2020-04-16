import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle, StyleSheet, StyleProp } from 'react-native';
import { useTheme } from './Theme';

interface DefaultTextProps extends TextProps {
  children?: ReactNode;
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'inherit' | 'sm' | 'md' | 'normal' | 'lg' | 'xl' | number;
  color?: 'dark' | 'light' | 'primary' | 'error' | 'grey' | 'warning' | 'inherit' | 'info' | string;
  fontWeight?: TextStyle['fontWeight'];
  lineHeight?: number;
}

export default function DefaultText(props: DefaultTextProps) {
  const { color, fontSize } = useTheme();

  const textStyle: StyleProp<TextStyle> = {};
  const { style, size, color: fontColor, lineHeight, fontWeight, ...restProps } = props;

  if (fontWeight) {
    textStyle.fontWeight = fontWeight;
  }

  if (lineHeight) {
    textStyle.lineHeight = lineHeight;
  }

  switch (size) {
    case 'xl':
      textStyle.fontSize = fontSize.xl;
      break;
    case 'lg':
      textStyle.fontSize = fontSize.lg;
      break;
    case 'h1':
      textStyle.fontSize = fontSize.h1;
      break;
    case 'h2':
      textStyle.fontSize = fontSize.h2;
      break;
    case 'h3':
      textStyle.fontSize = fontSize.h3;
      break;
    case 'h4':
      textStyle.fontSize = fontSize.h4;
      break;
    case 'sm':
      textStyle.fontSize = fontSize.sm;
      break;
    case 'md':
    case 'normal':
      textStyle.fontSize = fontSize.md;
      break;
    case 'inherit':
      break;
    default:
      textStyle.fontSize = size;
  }

  switch (fontColor) {
    case 'dark':
      textStyle.color = color.dark;
      break;
    case 'grey':
      textStyle.color = color.grey;
      break;
    case 'primary':
      textStyle.color = color.primary;
      break;
    case 'light':
      textStyle.color = color.light;
      break;
    case 'error':
      textStyle.color = color.error;
      break;
    case 'warning':
      textStyle.color = color.warning;
      break;
    case 'info':
      textStyle.color = color.info;
      break;
    case 'inherit':
      break;
    default:
      textStyle.color = fontColor;
  }

  return <Text style={[styles.text, textStyle, style]} {...restProps} />;
}

const styles = StyleSheet.create<{
  text: TextStyle;
}>({
  text: {
    textShadowColor: '#fff',
    includeFontPadding: false
  }
});

DefaultText.defaultProps = {
  size: 'inherit',
  color: 'inherit'
};

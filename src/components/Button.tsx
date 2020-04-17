import React, { ReactText } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';
import { useTheme } from './Theme';

interface Props {
  children?: ReactText;
  onPress?: () => void;
  disabled: boolean;
  size: 'sm' | 'lg' | 'md';
  type: 'primary' | 'error' | 'warning';
}

export default function Button(props: Props) {
  const { onPress, children, disabled, size, type } = props;
  const btnStyles = styles[size];

  const { color } = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.content,
        btnStyles,
        {
          backgroundColor: disabled ? 'rgb(187,187,187)' : color[type]
        }
      ]}
      activeOpacity={0.8}>
      <Text size={size === 'lg' || size === 'md' ? 'h1' : 'h3'} color='#fff'>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  disabled: false,
  size: 'md'
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'visible'
  },
  lg: {
    alignItems: 'center',
    width: '100%',
    height: scaleSize(90),
    borderRadius: scaleSize(45)
  },
  md: {
    alignItems: 'center',
    width: '100%',
    height: scaleSize(74),
    borderRadius: scaleSize(37)
  },
  sm: {
    alignItems: 'center',
    width: scaleSize(200),
    height: scaleSize(74),
    borderRadius: scaleSize(37)
  }
});

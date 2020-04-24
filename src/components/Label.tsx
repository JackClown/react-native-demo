import React, { ReactText } from 'react';
import { View, Image, TextProps, StyleSheet } from 'react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';
import { useTheme } from './Theme';

interface LabelProps extends TextProps {
  type: string;
  children: ReactText;
}

export default function Label(props: LabelProps) {
  const { type, ...restProps } = props;
  let source;

  switch (type) {
    case 'warning':
      source = require('@/assets/img/label-warning.png');
      break;
    case 'error':
      source = require('@/assets/img/label-error.png');
      break;
    case 'success':
      source = require('@/assets/img/label-success.png');
      break;
    case 'process':
      source = require('@/assets/img/label-process.png');
      break;
    case 'danger':
      source = require('@/assets/img/label-danger.png');
      break;
    case 'disabled':
      source = require('@/assets/img/label-disabled.png');
      break;
    default:
  }

  const { fontSize } = useTheme();

  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
      <View style={styles.label}>
        <Text {...restProps} color='#fff' size={fontSize.h4} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    transform: [
      {
        translateX: scaleSize(30)
      }
    ],
    width: scaleSize(144),
    height: scaleSize(50),
    alignItems: 'center'
  },
  image: {
    width: scaleSize(144),
    height: scaleSize(50)
  },
  label: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: scaleSize(24)
  }
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { whitespace_lg, whitespace, whitespace_sm, whitespace_xs } from '@/config/theme';
import { scaleSize } from '@/utils/scale';

interface Props {
  type: 'horizontal' | 'vertical';
  size: 'lg' | 'md' | 'sm' | 'xs' | 'xlg';
}

export default function WhiteSpace(props: Props) {
  return <View style={styles[props.type][props.size]} />;
}

WhiteSpace.defaultProps = {
  size: 'md',
  type: 'horizontal'
};

const horizontal = StyleSheet.create({
  xlg: {
    height: scaleSize(40)
  },
  lg: {
    height: whitespace_lg
  },
  md: {
    height: whitespace
  },
  sm: {
    height: whitespace_sm
  },
  xs: {
    height: whitespace_xs
  }
});

const vertical = StyleSheet.create({
  xlg: {
    width: scaleSize(40)
  },
  lg: {
    width: whitespace_lg
  },
  md: {
    width: whitespace
  },
  sm: {
    width: whitespace_sm
  },
  xs: {
    width: whitespace_xs
  }
});

const styles = { horizontal, vertical };

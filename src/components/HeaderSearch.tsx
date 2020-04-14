import React from 'react';

import Icon from './Icon';
import { scaleFont, scaleSize } from '@/utils/scale';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

interface Props {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function HeaderSeach(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]}>
      <Icon name='search' size={scaleFont(42)} color='#fff' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleSize(20),
    paddingHorizontal: scaleSize(10)
  }
});

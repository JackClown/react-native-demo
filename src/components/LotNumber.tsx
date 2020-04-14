import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { scaleSize, scaleFont } from '@/utils/scale';
import { primary_color } from '@/config/theme';

import Text from './Text';

interface Props {
  number: string;
  style?: StyleProp<ViewStyle>;
}

export default function LotNumber(props: Props) {
  return (
    <View style={[styles.wrapper, props.style]}>
      <Text color='primary' size={scaleFont(20)}>
        {props.number}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleSize(26),
    paddingHorizontal: scaleSize(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: primary_color,
    backgroundColor: '#C2EED9',
    borderRadius: scaleSize(13)
  }
});

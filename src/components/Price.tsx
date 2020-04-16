import React from 'react';
import { StyleProp, ViewStyle, Text as RNText, StyleSheet } from 'react-native';

import Text from './Text';

interface Props {
  price: number | string;
  unit?: string;
  style?: StyleProp<ViewStyle>;
  authority?: string;
}

export default function Price(props: Props) {
  const { price, unit, style } = props;

  return (
    <RNText style={[styles.container, style]}>
      <Text color='primary' size='normal' fontWeight='bold'>
        ¥
      </Text>
      <Text color='primary' size='h3' fontWeight='bold'>
        {price + ' '}
      </Text>
      {unit !== undefined && (
        <Text color='grey' size='normal'>
          /{unit}
        </Text>
      )}
    </RNText>
  );
}

const styles = StyleSheet.create({
  container: {
    includeFontPadding: false
  }
});

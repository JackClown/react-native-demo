import React from 'react';
import { View, StyleSheet, ViewStyle, Image, ImageStyle } from 'react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';

const noGoods = require('@/assets/img/no-goods.png');
const noSearchResults = require('@/assets/img/nobilldata.png');

interface Props {
  type: 'goods' | 'search';
  text: string;
}

export default function NoData({ type, text }: Props) {
  let source;

  switch (type) {
    case 'goods':
      source = noGoods;
      break;
    case 'search':
    default:
      source = noSearchResults;
  }

  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
      <Text color='grey'>{text}</Text>
    </View>
  );
}

NoData.defaultProps = {
  type: 'search',
  text: '没有找到符合条件的结果~'
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  image: ImageStyle;
}>({
  container: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  image: {
    width: scaleSize(260),
    height: scaleSize(260)
  }
});

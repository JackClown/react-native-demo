import React from 'react';
import { View, StyleSheet, ViewStyle, Image, ImageStyle } from 'react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';

interface Props {
  text: string;
}

export default function NoData({ text }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/img/no-data.png')} style={styles.image} />
      <Text color='grey'>{text}</Text>
    </View>
  );
}

NoData.defaultProps = {
  text: '暂无数据'
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

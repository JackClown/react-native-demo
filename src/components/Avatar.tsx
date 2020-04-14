import React from 'react';
import { View, Image, ImageSourcePropType, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { scaleSize } from '@/utils/scale';

interface Props {
  url?: string;
  size: 'lg' | 'md' | 'xlg';
  style?: StyleProp<ViewStyle>;
}

const defaultAvatar = require('@/assets/img/default-goods.png');

export default function Avatar(props: Props) {
  const { size, style, url } = props;

  let avatar: ImageSourcePropType = defaultAvatar;

  if (url) {
    avatar = { uri: url };
  }

  return (
    <View style={style}>
      <Image source={avatar} style={styles[size]} />
    </View>
  );
}

Avatar.defaultProps = {
  size: 'md'
};

const styles = StyleSheet.create({
  lg: {
    width: scaleSize(140),
    height: scaleSize(140),
    borderRadius: scaleSize(8),
    borderWidth: scaleSize(1),
    borderColor: '#eee'
  },
  md: {
    width: scaleSize(100),
    height: scaleSize(100),
    borderRadius: scaleSize(8),
    borderWidth: scaleSize(1),
    borderColor: '#eee'
  },
  xlg: {
    width: scaleSize(180),
    height: scaleSize(180),
    borderRadius: scaleSize(8),
    borderWidth: scaleSize(1),
    borderColor: '#eee'
  }
});

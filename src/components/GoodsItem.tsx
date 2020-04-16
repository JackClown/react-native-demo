import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';
import Avatar from './Avatar';

interface Props {
  name: string | ReactNode;
  spec: string | ReactNode;
  image?: string;
  children?: ReactNode;
  size?: 'lg' | 'md' | 'xlg';
}

export default function GoodsItem(props: Props) {
  const { name, size, image, children, spec } = props;

  return (
    <View style={style.container}>
      <Avatar style={style.itemImage} size={size} url={image} />
      <View style={style.content}>
        <View style={style.header}>
          <View>
            <Text size="h3" color="dark" fontWeight="bold" numberOfLines={1}>
              {name}
            </Text>
          </View>
          <View style={style.headerRight}></View>
        </View>
        {typeof spec === 'string' ? (
          <Text numberOfLines={1} size="sm" color="grey">
            规格：{spec}
          </Text>
        ) : (
          spec
        )}
        <View style={style.body}>{children}</View>
      </View>
    </View>
  );
}

GoodsItem.defaultProps = {
  size: 'lg'
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  content: {
    flex: 1,
    paddingVertical: scaleSize(5)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(12)
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  itemImage: {
    marginRight: scaleSize(20)
  },
});

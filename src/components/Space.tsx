import React, { ReactNode, Children } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { whitespace_sm, whitespace, whitespace_lg, whitespace_xs } from '@/config/theme';

interface Props {
  children?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  direction?: 'horizontal' | 'vetical' | 'horizontal-reverse' | 'vertical-reverse';
  style?: StyleProp<ViewStyle>;
}

export default function Space(props: Props) {
  const { size, children, direction, style } = props;

  let itemStyle: StyleProp<ViewStyle>;
  let containerStyle: StyleProp<ViewStyle> | undefined;
  let property: 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft';

  switch (direction) {
    case 'horizontal-reverse':
      property = 'marginLeft';
      containerStyle = { flexDirection: 'row' };
      break;
    case 'vertical-reverse':
      property = 'marginTop';
      break;
    case 'horizontal':
      property = 'marginRight';
      containerStyle = { flexDirection: 'row' };
      break;
    case 'vetical':
    default:
      property = 'marginBottom';
  }

  switch (size) {
    case 'xs':
      itemStyle = { [property]: whitespace_xs };
      break;
    case 'sm':
      itemStyle = { [property]: whitespace_sm };
      break;
    case 'lg':
      itemStyle = { [property]: whitespace_lg };
      break;
    case 'md':
    default:
      itemStyle = { [property]: whitespace };
      break;
  }

  return (
    <View style={[containerStyle, style]}>
      {Children.map(children, child => {
        if (child === null) {
          return null;
        }

        return <View style={itemStyle}>{child}</View>;
      })}
    </View>
  );
}

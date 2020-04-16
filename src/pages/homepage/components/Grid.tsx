import React, { ReactNode, Children } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { whitespace } from '@/config/theme';

interface Props {
  cols: number;
  children: ReactNode;
  gutter?: [number, number] | number;
}

export default function Grid(props: Props) {
  let { cols, children, gutter } = props;

  if (gutter === undefined) {
    gutter = [0, whitespace];
  } else if (!Array.isArray(gutter)) {
    gutter = [gutter, 0];
  }

  const containerStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -gutter[0] / 2,
    marginVertical: -gutter[1] / 2
  };

  const itemStyle: StyleProp<ViewStyle> = {
    width: `${100 / cols}%`,
    marginVertical: gutter[1] / 2,
    marginHorizontal: gutter[0] / 2
  };

  return (
    <View style={containerStyle}>
      {Children.map(children, (child, index) => {
        return (
          <View style={itemStyle} key={index}>
            {child}
          </View>
        );
      })}
    </View>
  );
}

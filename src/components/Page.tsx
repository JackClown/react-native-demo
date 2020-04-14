import React, { ReactNode, useEffect } from 'react';
import { View, StyleProp, ViewStyle, Platform } from 'react-native';

import AnalysticUtil from '@/utils/AnalyticsUtil';
import { useTheme } from './Theme';

interface Props {
  name?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Page(props: Props) {
  const { name, style, children } = props;

  const { color } = useTheme();

  useEffect(() => {
    if (name) {
      if (Platform.OS === 'ios') {
        AnalysticUtil.onPageBegin(name);
      } else {
        AnalysticUtil.onPageStart(name);
      }

      return () => {
        AnalysticUtil.onPageEnd(name);
      };
    }
  }, [name]);

  let containerStyle: StyleProp<ViewStyle> = [{ flex: 1, backgroundColor: color.background }];

  if (style) {
    containerStyle = [containerStyle, style];
  }

  return <View style={containerStyle}>{children}</View>;
}

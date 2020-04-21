import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';

import { whitespace } from './theme';
import { scaleFont, scaleSize } from '@/utils/scale';
import { HeaderBack } from '@/components';
import { useTheme } from '@/components/Theme';

export const screenOptions: StackNavigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
    height: scaleSize(88)
  },
  headerLeft: props => <HeaderBack {...props} />,
  headerLeftContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: whitespace / 2
  },
  headerRightContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: whitespace / 2
  },
  headerTitleStyle: {
    fontSize: scaleFont(36),
    fontWeight: 'normal',
    color: '#fff'
  },
  headerTintColor: '#fff',
  gestureEnabled: true,
  headerTitleAlign: 'center'
};

export default function useScreenOptions(): StackNavigationOptions {
  const height = useSafeArea().top + scaleSize(88);

  const { color } = useTheme();

  return {
    ...screenOptions,
    headerStyle: {
      ...(screenOptions.headerStyle as Object),
      backgroundColor: color.header,
      height
    }
  };
}

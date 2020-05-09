import { StackNavigationOptions } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';

import styles from './styles';
import { scaleSize, scaleFont } from '@/utils/scale';
import HeaderBack from '@/components/HeaderBack';
import { useTheme } from '@/components/Theme';
import { StyleSheet } from 'react-native';

export const screenOptions: StackNavigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0
  },
  headerLeft: HeaderBack,
  headerLeftContainerStyle: styles.headerLeft,
  headerRightContainerStyle: styles.headerRight,
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
      ...StyleSheet.flatten(screenOptions.headerStyle),
      backgroundColor: color.header,
      height
    }
  };
}

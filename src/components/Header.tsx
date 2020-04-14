import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { screenOptions } from '@/config/screeOptions';
import { scaleSize } from '@/utils/scale';
import Text from './Text';
import { useTheme } from './Theme';

interface Props {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}

export default function Header(props: Props) {
  const { left, title, right } = props;

  const { color } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: color.header }}>
      <View style={styles.header}>
        {left !== undefined && <View style={styles.left}>{left}</View>}
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {right !== undefined && <View style={styles.right}>{right}</View>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: scaleSize(88),
    justifyContent: 'center'
  },
  left: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    ...screenOptions.headerLeftContainerStyle
  },
  title: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: screenOptions.headerTitleStyle,
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    zIndex: 1,
    ...screenOptions.headerRightContainerStyle
  }
});

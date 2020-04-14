import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle, View, TouchableHighlight } from 'react-native';

import { whitespace, whitespace_lg } from '@/config/theme';
import { scaleSize } from '@/utils/scale';
import { useTheme } from './Theme';
import Text from './Text';

interface Props {
  header?: string | ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  size?: 'xlg' | 'lg' | 'md';
  onPress?: () => void;
}

export default function CardView(props: Props) {
  const { style, header, children, size, onPress } = props;

  const { color } = useTheme();

  return (
    <TouchableHighlight underlayColor={color.background} onPress={onPress}>
      <View
        style={[styles.container, styles[size as keyof typeof styles || 'md'], { backgroundColor: color.foreground }, style]}>
        {header !== undefined && (
          <View style={styles.header}>
            {typeof header === 'string' || typeof header === 'number' ? (
              <Text size="h1" color="dark">
                {header}
              </Text>
            ) : (
              header
            )}
          </View>
        )}
        {children}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  header: ViewStyle;
  lg: ViewStyle;
  md: ViewStyle;
  xlg: ViewStyle;
}>({
  container: {
    borderRadius: scaleSize(8),
    shadowColor: 'rgb(84, 96, 90)',
    shadowOpacity: 0.14,
    shadowRadius: scaleSize(10)
  },
  header: {
    paddingBottom: scaleSize(36)
  },
  xlg: {
    paddingVertical: scaleSize(40),
    paddingHorizontal: whitespace_lg
  },
  lg: {
    paddingVertical: whitespace_lg,
    paddingHorizontal: whitespace_lg
  },
  md: {
    paddingVertical: whitespace,
    paddingHorizontal: whitespace_lg
  }
});

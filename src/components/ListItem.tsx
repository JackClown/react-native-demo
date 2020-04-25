import React, { ReactNode } from 'react';
import { TouchableHighlight, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { whitespace, whitespace_lg } from '../config/theme';
import { scaleSize } from '@/utils/scale';
import Text from './Text';
import { useTheme } from './Theme';

export interface ListItemProps {
  styles?: {
    body?: StyleProp<ViewStyle>;
    title?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
  };
  required?: boolean;
  children?: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressOut?: () => void;
  arrow?: boolean;
}

export default function ListItem({
  title,
  extra,
  children,
  onPress,
  onLongPress,
  onPressOut,
  arrow,
  required,
  ...rest
}: ListItemProps) {
  const { color, fontSize } = useTheme();

  let bodyStyle: StyleProp<ViewStyle> = styles.body;
  let titleStyle: StyleProp<ViewStyle> = styles.title;
  let contentStyle: StyleProp<ViewStyle> = styles.content;

  if (rest.styles) {
    if (rest.styles.body) {
      bodyStyle = [styles.body, rest.styles.body];
    }

    if (rest.styles.title) {
      titleStyle = [styles.title, rest.styles.title];
    }

    if (rest.styles.content) {
      contentStyle = [contentStyle, rest.styles.content];
    }
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      underlayColor={color.background}
      style={[styles.wrapper, { backgroundColor: color.foreground }]}
    >
      <View style={[styles.container, { borderBottomColor: color.line }]}>
        <View style={contentStyle}>
          {title ? (
            <View style={titleStyle}>
              {typeof title === 'string' || typeof title === 'number' ? (
                <Text size='h3' color='dark'>
                  {title}
                </Text>
              ) : (
                title
              )}
              {required && (
                <Text color='error' fontWeight='bold'>
                  *
                </Text>
              )}
            </View>
          ) : null}
          {children ? <View style={bodyStyle}>{children}</View> : null}
          {extra !== undefined ? (
            <View style={styles.extra}>
              {typeof extra === 'string' || typeof extra === 'number' ? (
                <Text size='h3' color={arrow ? 'dark' : 'grey'}>
                  {extra}
                </Text>
              ) : (
                extra
              )}
            </View>
          ) : null}
        </View>
        {arrow && <Icon style={styles.arrow} name='arrow-right' size={fontSize.md} color={color.grey} />}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: whitespace_lg
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: whitespace_lg,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: scaleSize(110)
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: whitespace
  },
  body: {
    flex: 1,
    paddingVertical: whitespace
  },
  extra: {
    alignItems: 'flex-end'
  },
  arrow: {
    paddingLeft: 5
  }
});

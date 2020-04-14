import React, { Fragment } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

import Text from './Text';
import { scaleSize } from '@/utils/scale';
import { bottom_border_color } from '@/config/theme';

interface Props {
  actions: {
    type: 'primary' | 'error' | 'gray';
    text: string;
    onPress: () => void;
  }[];
}

export default function ButtonGroup(props: Props) {
  const { actions } = props;

  return (
    <View style={styles.footer}>
      {actions.map((item, index) => (
        <Fragment key={item.text}>
          <TouchableHighlight style={styles.footerButton} onPress={item.onPress} underlayColor={bottom_border_color}>
            <Text size='h1' color={item.type}>
              {item.text}
            </Text>
          </TouchableHighlight>
          {index < actions.length - 1 && <View style={styles.line} />}
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    width: '100%',
    height: scaleSize(90),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: bottom_border_color,
    backgroundColor: '#fff'
  },
  line: {
    width: StyleSheet.hairlineWidth,
    height: '100%',
    backgroundColor: bottom_border_color
  },
  footerButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

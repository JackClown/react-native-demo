import React, { ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { whitespace, whitespace_lg } from '../config/theme';
import { scaleSize } from '@/utils/scale';
import Text from './Text';
import Footer from './Footer';
import { useTheme } from './Theme';

interface Props {
  onSubmit: () => void;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  disabled?: boolean;
  hidable?: boolean;
}

export default function SubmitFooter(props: Props) {
  const { onSubmit, left, center, right, disabled, hidable } = props;

  const { color } = useTheme();

  const btnText = (
    <Text size='h3' color='#fff'>
      {right === undefined ? '提交' : right}
    </Text>
  );

  return (
    <Footer hidable={hidable}>
      <View style={style.footer}>
        <View style={style.content}>
          <View style={style.left}>{left}</View>
          <View style={style.center}>{center}</View>
        </View>
        {disabled ? (
          <View style={[style.btn, { backgroundColor: color.lighter }]}>{btnText}</View>
        ) : (
          <TouchableOpacity onPress={onSubmit} style={[style.btn, { backgroundColor: color.primary }]}>
            {btnText}
          </TouchableOpacity>
        )}
      </View>
    </Footer>
  );
}

const style = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: scaleSize(110)
  },
  left: {
    justifyContent: 'center'
  },
  center: {
    justifyContent: 'center'
  },
  content: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: whitespace_lg,
    paddingRight: whitespace
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

import React, { ReactNode, Fragment } from 'react';
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
  itemCount?: ReactNode; //品项
  totalCount?: ReactNode; //数量
  totalPrice?: ReactNode; //总额
  disabled?: boolean;
  hidable?: boolean;
}

export default function SubmitFooter(props: Props) {
  const { itemCount, totalCount, totalPrice, onSubmit, left, center, right, disabled, hidable } = props;

  const { color } = useTheme();

  const btnText = (
    <Text size="h3" color="#fff">
      {right === undefined ? '提交' : right}
    </Text>
  );

  return (
    <Footer hidable={hidable}>
      <View style={style.footer}>
        <View style={style.content}>
          <View style={style.total}>
            {left === undefined ? (
              <Fragment>
                <Text numberOfLines={1} size="h4" color="dark">
                  品项：{itemCount}
                </Text>
                <Text numberOfLines={1} size="h4" color="dark">
                  数量：{totalCount}
                </Text>
              </Fragment>
            ) : (
              left
            )}
          </View>
          <View style={style.price}>
            {center === undefined ? (
              <Text numberOfLines={1}>
                <Text size="h3" color="dark">
                  总额：
                </Text>
                <Text color="error" fontWeight="bold" size="normal">
                  ¥
                </Text>
                <Text color="error" fontWeight="bold" size="h1">
                  {totalPrice}
                </Text>
              </Text>
            ) : (
              center
            )}
          </View>
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
  total: {
    justifyContent: 'center'
  },
  price: {
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

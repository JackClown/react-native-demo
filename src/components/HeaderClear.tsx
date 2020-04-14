import React from 'react';
import { TouchableOpacity } from 'react-native';

import Modal from './Modal';
import Text from './Text';
import styles from '@/config/styles';

interface Props {
  amount: number;
  clear: () => void;
}

export default function HeaderClear(props: Props) {
  return props.amount > 0 ? (
    <TouchableOpacity
      onPress={() => {
        Modal.alert(
          '清空商品',
          '请确认是否清空商品?',
          [
            {
              text: '取消'
            },
            {
              text: '确定',
              onPress: props.clear
            }
          ],
          'clear'
        );
      }}
      style={styles.headerBtn}>
      <Text color="#fff" size="h3">
        清空
      </Text>
    </TouchableOpacity>
  ) : null;
}

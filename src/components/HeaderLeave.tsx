import React from 'react';

import Modal from './Modal';
import HeaderBack from './HeaderBack';

interface Props {
  amount: number;
  onPress: () => void;
  clear: () => void;
}

export default function HeaderLeave(props: Props) {
  const { amount, onPress, clear } = props;

  const handlePress = () => {
    if (amount > 0) {
      Modal.alert(
        '提示',
        '返回将清除数据，是否继续?',
        [
          { text: '取消' },
          {
            text: '确认',
            onPress: () => {
              onPress();
              clear();
            }
          }
        ],
        'clear'
      );
    } else {
      onPress();
      clear();
    }
  };

  return <HeaderBack onPress={handlePress} />;
}

import React, { ReactNode } from 'react';
import { Badge } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native';

import Text from './Text';
import styles from '@/config/styles';
import { error_color } from '../config/theme';

interface Props {
  onPress: () => void;
  amount: number;
  children?: ReactNode;
}

export default function HeaderOrder(props: Props) {
  const { onPress, amount, children } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.headerBtn}>
      <Badge dot={amount > 0} styles={{ dot: { backgroundColor: error_color } }}>
        <Text size='h3' color='#fff'>
          {children}
        </Text>
      </Badge>
    </TouchableOpacity>
  );
}

HeaderOrder.defaultProps = {
  children: '清单'
};

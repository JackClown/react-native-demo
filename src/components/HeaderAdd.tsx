import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';

import Text from './Text';
import styles from '@/config/styles';

interface Props {
  onPress?: () => void;
  text?: string | ReactNode;
  icon?: boolean;
}

export default function HeaderAdd(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.headerBtn}>
      {props.icon ? (
        <Icon name='plus' size='md' color='#fff' />
      ) : (
        <Text size='h3' color='#fff' onPress={props.onPress}>
          {props.text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

HeaderAdd.defaultProps = {
  text: '新增'
};

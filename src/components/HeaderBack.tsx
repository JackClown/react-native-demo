import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import styles from '@/config/styles';
import { scaleSize } from '@/utils/scale';

export default function HeaderBack(props: { onPress?: () => void }) {
  const { onPress } = props;

  const handlePress = () => {
    if (onPress) {
      requestAnimationFrame(onPress);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.headerBtn}>
      <Icon name='chevron-thin-left' size={scaleSize(40)} color='#fff' />
    </TouchableOpacity>
  );
}

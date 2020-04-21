import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from '@/config/styles';
import { scaleSize } from '@/utils/scale';
import Icon from '@/components/Icon';

export default function HeaderBack(props: { onPress?: () => void }) {
  const { onPress } = props;

  const handlePress = () => {
    if (onPress) {
      requestAnimationFrame(onPress);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.headerBtn}>
      <Icon name='back' size={scaleSize(40)} color='#fff' />
    </TouchableOpacity>
  );
}

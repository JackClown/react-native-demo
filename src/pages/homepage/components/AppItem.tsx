import React, { ReactElement, isValidElement } from 'react';
import { TouchableOpacity, ImageRequireSource, Image, StyleSheet } from 'react-native';
import { scaleSize } from '@/utils/scale';
import { Text } from '@/components';

interface Props {
  onPress: () => void;
  icon: ImageRequireSource | ReactElement<any>;
  name: string;
  color?: string;
}

export default function AppItem(props: Props) {
  const { onPress, icon, name, color } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {isValidElement(icon) ? icon : <Image source={icon} style={styles.icon} />}
      <Text size="normal" color={color || 'grey'} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scaleSize(124)
  },
  icon: {
    width: scaleSize(90),
    height: scaleSize(90)
  }
});

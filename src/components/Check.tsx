import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scaleSize } from '@/utils/scale';

interface Props {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const checked = require('@/assets/img/checked.png');
const unchecked = require('@/assets/img/unchecked.png');

export default function Check(props: Props) {
  let handlePress = () => {
    if (props.onChange) {
      props.onChange(!props.checked);
    }
  };

  let Wrapper: any = props.onChange ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <Wrapper style={styles.btn} onPress={handlePress}>
        <Image source={props.checked ? checked : unchecked} style={styles.image} />
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(44),
    height: scaleSize(44),
    overflow: 'visible'
  },
  image: {
    width: scaleSize(44),
    height: scaleSize(44)
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(80),
    height: scaleSize(80)
  }
});

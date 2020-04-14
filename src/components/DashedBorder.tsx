import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default function DashedBorder() {
  return <Image source={require('@/assets/img/dash.png')} style={styles.container} resizeMode='repeat' />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1
  }
});

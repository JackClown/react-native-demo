import React, { ReactNode, useRef, useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Image, Text } from 'react-native';

import { scaleSize } from '@/utils/scale';
import { font_size, grey_color } from '@/config/theme';

interface Props {
  loading: boolean;
  children?: ReactNode;
}

export default function Spin(props: Props) {
  const { children, loading } = props;

  const [visible, setVisible] = useState(loading);
  const spin = useRef<Animatable.View>(null);

  useEffect(() => {
    if (loading === false) {
      if (spin.current && spin.current.fadeOut) {
        spin.current.fadeOut(700).then(() => {
          setVisible(false);
        });
      }
    } else {
      setVisible(true);
    }
  }, [loading]);

  return (
    <>
      {children}
      {visible && (
        <Animatable.View ref={spin as any} style={styles.loadingWrapper}>
          <Image source={require('@/assets/img/loading.gif')} style={styles.loadingImage} />
          <Text style={styles.loadingText}>正在努力加载中...</Text>
        </Animatable.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  loadingImage: {
    width: scaleSize(112),
    height: scaleSize(260)
  },
  loadingText: {
    marginTop: scaleSize(38),
    fontSize: font_size,
    color: grey_color
  }
});

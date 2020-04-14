import React, { ReactNode, useEffect, useState } from 'react';
import { Keyboard, EmitterSubscription, StyleSheet, SafeAreaView, DeviceEventEmitter } from 'react-native';

import { useTheme } from './Theme';

interface Props {
  children: ReactNode;
  hidable: boolean;
}

export const KEYBOARD_WILL_SHOW = 'KEYBOARD_WILL_SHOW';

export default function Footer(props: Props) {
  const { children, hidable } = props;

  const [visible, setVisible] = useState(true);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useEffect(() => {
    let listeners: EmitterSubscription[] = [];

    if (hidable) {
      listeners.push(
        DeviceEventEmitter.addListener(KEYBOARD_WILL_SHOW, hide),
        Keyboard.addListener('keyboardDidHide', show)
      );
    }

    return () => {
      listeners.forEach(item => item.remove);
    };
  }, [hidable]);

  const { color } = useTheme();

  return visible ? (
    <SafeAreaView
      style={{
        backgroundColor: color.foreground,
        borderTopColor: color.line,
        borderTopWidth: StyleSheet.hairlineWidth
      }}>
      {children}
    </SafeAreaView>
  ) : null;
}

Footer.defaultProps = {
  hidable: true
};

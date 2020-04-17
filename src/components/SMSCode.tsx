import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import Modal from './Modal';
import Text from './Text';
import { useInterval } from '@/utils/hooks';

interface Props {
  style?: StyleProp<ViewStyle>;
  onError?: (err: Error) => void;
  autoSend?: boolean;
  request: () => Promise<any>;
}

export default function SMSCode(props: Props) {
  const { onError, autoSend, request } = props;

  const [timing, setTiming] = useState(0);

  const send = async () => {
    try {
      await request();

      setTiming(180);
    } catch (err) {
      if (onError) {
        onError(err);
      } else {
        Modal.error('提示', err.message);
      }
    }
  };

  useEffect(() => {
    if (autoSend) {
      send();
    }
  }, []);

  useInterval(
    () => {
      setTiming(timing - 1);
    },
    timing > 0 ? 1000 : null
  );

  return (
    <TouchableOpacity onPress={send} disabled={timing > 0}>
      {timing <= 0 ? (
        <Text size='h4' color='dark'>
          发送验证码
        </Text>
      ) : (
        <Text size='h4' color='light'>
          重新发送{timing}s
        </Text>
      )}
    </TouchableOpacity>
  );
}

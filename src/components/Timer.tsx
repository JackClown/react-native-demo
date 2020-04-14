import React, { createContext, useState, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { Flex } from '@ant-design/react-native';

import Text from './Text';
import { scaleSize } from '@/utils/scale';
import { primary_color } from '@/config/theme';
import { useInterval } from '@/utils/hooks';

const { Provider, Consumer } = createContext(new Date());

interface ProviderProps {
  duration: number; //毫秒
  children?: ReactNode;
}

function TimerProvider(props: ProviderProps) {
  const { duration, children } = props;
  const [date, setDate] = useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, duration);

  return <Provider value={date}>{children}</Provider>;
}

TimerProvider.defaultProps = {
  duration: 1000
};

interface Props {
  time: string;
  format?: string;
  outOfTime?: ReactNode;
}

export default function Timer(props: Props) {
  const { time, format, outOfTime } = props;

  const point = moment(time, format);

  return (
    <Consumer>
      {(date: Date) => {
        if (point.isBefore(date)) {
          return outOfTime;
        }

        const duration = moment.duration(point.diff(date));

        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();

        return (
          <Flex>
            <View style={styles.time}>
              <Text size='normal' color='#fff'>
                {days}
              </Text>
            </View>
            <Text size='normal' color='light'>
              天
            </Text>
            <View style={styles.time}>
              <Text size='normal' color='#fff'>
                {('0' + hours).slice(-2)}
              </Text>
            </View>
            <Text size='normal' color='light'>
              小时
            </Text>
            <View style={styles.time}>
              <Text size='normal' color='#fff'>
                {('0' + minutes).slice(-2)}
              </Text>
            </View>
            <Text size='normal' color='light'>
              分
            </Text>
          </Flex>
        );
      }}
    </Consumer>
  );
}

Timer.defaultProps = {
  format: 'YYYY-MM-DD HH:mm:ss'
};

Timer.Provider = TimerProvider;
Timer.Consumer = Consumer;

const styles = StyleSheet.create({
  time: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(28),
    marginHorizontal: scaleSize(4),
    paddingHorizontal: scaleSize(4),
    backgroundColor: primary_color,
    borderRadius: scaleSize(4)
  }
});

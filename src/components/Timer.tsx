import React, { createContext, useState, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { Flex } from '@ant-design/react-native';

import { scaleSize } from '@/utils/scale';
import { useInterval } from '@/utils/hooks';
import Text from './Text';
import { useTheme } from './Theme';

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
  const { color } = useTheme();

  const style = [styles.time, { backgroundColor: color.primary }];
  const point = moment(time, format);

  return (
    <Consumer>
      {(date: Date) => {
        if (point.isBefore(date)) {
          return outOfTime;
        }

        const duration = moment.duration(point.diff(date));

        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return (
          <Flex>
            <View style={style}>
              <Text size='md' color='#fff'>
                {days}
              </Text>
            </View>
            <Text size='md' color='light'>
              天
            </Text>
            <View style={style}>
              <Text size='md' color='#fff'>
                {('0' + hours).slice(-2)}
              </Text>
            </View>
            <Text size='md' color='light'>
              小时
            </Text>
            <View style={style}>
              <Text size='md' color='#fff'>
                {('0' + minutes).slice(-2)}
              </Text>
            </View>
            <Text size='md' color='light'>
              分
            </Text>
            <View style={style}>
              <Text size='md' color='#fff'>
                {('0' + seconds).slice(-2)}
              </Text>
            </View>
            <Text size='md' color='light'>
              秒
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
    borderRadius: scaleSize(4)
  }
});

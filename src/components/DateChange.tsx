import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import moment, { Moment } from 'moment';

import { Text, Modal } from '@/components';
import { font_size_h1 } from '@/config/theme';
import { scaleSize } from '@/utils/scale';

interface Props {
  type: '日' | '周' | '月' | '自定义';
  start: string;
  end: string;
  format?: string;
  onChange: (start: string, end: string) => void;
  backgroundColor?: string;
  color?: string;
  limitTimeType?: string;
  limitTimeCount?: number;
}

export default class DateChange extends PureComponent<Props> {
  static defaultProps = {
    format: 'YYYY-MM-DD'
  };

  private handlePrev = () => {
    const { type, start, end, limitTimeCount, limitTimeType, format } = this.props;
    let startDate = moment(start);
    let endDate = moment(end);

    switch (type) {
      case '自定义':
        const diff = endDate.diff(start, 'd') + 1;

        startDate.subtract(diff, 'd');
        endDate.subtract(diff, 'd');
        break;
      case '月':
        startDate.subtract(1, 'M');
        endDate.subtract(1, 'M').endOf('M');
        break;
      case '周':
        startDate.subtract(7, 'd');
        endDate.subtract(7, 'd').endOf('isoWeek');
        break;
      case '日':
      default:
        startDate.subtract(1, 'd');
        endDate.subtract(1, 'd');
    }

    if (endDate.isAfter(moment())) {
      endDate = moment();
    }

    if (this.valid(startDate, limitTimeCount, limitTimeType)) {
      this.props.onChange(startDate.format(format), endDate.format(format));
    }
  };

  private handleNext = () => {
    const { type, start, end, format } = this.props;
    let startDate = moment(start);
    let endDate = moment(end);

    switch (type) {
      case '自定义':
        const diff = endDate.diff(start, 'd') + 1;

        startDate.add(diff, 'd');
        endDate.add(diff, 'd');
        break;
      case '月':
        startDate.add(1, 'M');
        endDate.add(1, 'M').endOf('M');
        break;
      case '周':
        startDate.add(7, 'd');
        endDate.add(7, 'd').endOf('isoWeek');
        break;
      case '日':
      default:
        startDate.add(1, 'd');
        endDate.add(1, 'd');
    }

    const now = moment();

    if (startDate.isAfter(now)) {
      Modal.error('提示', '开始时间不可晚于当前时间');
      return;
    }

    if (endDate.isAfter(now)) {
      endDate = now;
    }

    this.props.onChange(startDate.format(format), endDate.format(format));
  };

  public valid(start: Moment, limitTimeCount?: number, limitTimeType?: string) {
    if (
      limitTimeType !== undefined &&
      limitTimeType !== '无限制' &&
      (limitTimeType[1] !== '数' || limitTimeCount !== 0)
    ) {
      let error = new Error('无查询权限，请前往后台用户管理中设置');

      try {
        switch (limitTimeType) {
          case '本月':
            if (start.isBefore(moment().startOf('month'))) {
              throw error;
            }
            break;
          case '本季':
            if (start.isBefore(moment().startOf('quarter'))) {
              throw error;
            }
            break;
          case '本年':
            if (start.isBefore(moment().startOf('year'))) {
              throw error;
            }
            break;
          case '年数':
            if (start.isBefore(moment().subtract(limitTimeCount, 'year'))) {
              throw error;
            }
            break;
          case '月数':
            if (start.isBefore(moment().subtract(limitTimeCount, 'month'))) {
              throw error;
            }
            break;
          case '天数':
            if (start.isBefore(moment().subtract(limitTimeCount, 'day'))) {
              throw error;
            }
            break;
          default:
        }

        return true;
      } catch (err) {
        Modal.error('提示', err.message);
        return false;
      }
    } else {
      return true;
    }
  }

  render() {
    const { start, end, backgroundColor, color } = this.props;

    return (
      <View style={backgroundColor ? [styles.date, { backgroundColor }] : styles.date}>
        <TouchableOpacity style={styles.dateOperator} onPress={this.handlePrev}>
          <Icon name='chevron-thin-left' size={font_size_h1} color={color || '#fff'} />
        </TouchableOpacity>
        <Text size='h3' color={color || '#fff'}>
          {start}至{end}
        </Text>
        <TouchableOpacity style={styles.dateOperator} onPress={this.handleNext}>
          <Icon name='chevron-thin-right' size={font_size_h1} color={color || '#fff'} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleSize(80)
  },
  dateOperator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

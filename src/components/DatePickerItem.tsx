import React from 'react';
import { DatePicker } from '@ant-design/react-native';
import moment from 'moment';

import ListItem, { ListItemProps } from './ListItem';
import Text from './Text';
import { useTheme } from './Theme';

function Item(props: ListItemProps) {
  const { title, extra, ...restProps } = props;

  return (
    <ListItem
      {...restProps}
      title={title}
      extra={
        extra === '请选择' ? (
          <Text size='h3' color='light'>
            请选择
          </Text>
        ) : (
          <Text size='h3' color='dark'>
            {extra}
          </Text>
        )
      }
      arrow
    />
  );
}

interface Props {
  title: string;
  value: string;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: string) => void;
  required?: boolean;
  mode: 'date' | 'time' | 'datetime' | 'year' | 'month';
}

export default function DatePickerItem(props: Props) {
  const { mode, title, value, onChange, required, ...restProps } = props;

  const { color } = useTheme();

  let type = '';

  switch (mode) {
    case 'date':
      type = 'YYYY-MM-DD';
      break;
    case 'time':
      type = 'HH:mm';
      break;
    case 'datetime':
      type = 'YYYY-MM-DD HH:mm';
      break;
    case 'year':
      type = 'YYYY';
      break;
    case 'month':
      type = 'MM';
      break;
  }

  const handleChange = (value: Date) => {
    if (onChange) {
      onChange(moment(value).format(type));
    }
  };

  return (
    <DatePicker
      styles={{
        actionText: {
          color: color.primary
        }
      }}
      mode={mode}
      value={value ? moment(value, type).toDate() : undefined}
      onChange={handleChange}
      {...restProps}
    >
      <Item title={title} required={required} />
    </DatePicker>
  );
}

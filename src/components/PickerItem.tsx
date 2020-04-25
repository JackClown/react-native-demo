import React, { ReactNode, ReactText } from 'react';
import { Picker } from '@ant-design/react-native';

import ListItem, { ListItemProps } from './ListItem';
import Text from './Text';
import { useTheme } from './Theme';

interface Props<T extends ReactText> {
  title: ReactNode;
  data: LabeledValue<T>[];
  value?: T;
  disabled?: boolean;
  onChange: (value: T) => void;
  required?: boolean;
  format?: (labels: string[]) => any;
}

function Item(props: ListItemProps & { disabled?: boolean }) {
  const { title, extra, disabled, ...restProps } = props;

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
          <Text size='h3' color={disabled ? 'light' : 'dark'}>
            {extra}
          </Text>
        )
      }
      arrow
    />
  );
}

export default function PickerItem<T extends ReactText = ReactText>(props: Props<T>) {
  const { title, value, onChange, required, data, ...restProps } = props;
  let pickerValue: ReactText[];

  if (!value) {
    pickerValue = [];
  } else {
    pickerValue = [value];
  }

  const handleChange = (value: ReactText[] | undefined) => {
    if (value && value.length > 0) {
      for (let item of data) {
        if (item.value === value[0]) {
          onChange(value[0] as T);
        }
      }
    }
  };

  const { color } = useTheme();

  return (
    <Picker
      styles={{
        actionText: {
          color: color.primary
        }
      }}
      cols={1}
      value={pickerValue}
      onChange={handleChange}
      data={data}
      {...restProps}
    >
      <Item title={title} required={required} disabled={restProps.disabled} />
    </Picker>
  );
}

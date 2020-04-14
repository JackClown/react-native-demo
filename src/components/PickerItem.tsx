import React, { PureComponent, ReactNode, ReactText } from 'react';
import { Picker } from '@ant-design/react-native';

import ListItem, { ListItemProps } from './ListItem';
import Text from './Text';
import { primary_color } from '../config/theme';

interface Props {
  data: Array<{
    label: string;
    value: ReactText; //当为number，不可以为0
  }>;
  value?: ReactText;
  title: ReactNode;
  disabled?: boolean;
  onChange: (value: ReactText) => void;
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

export default class PickerItem extends PureComponent<Props> {
  handleChange = (value: ReactText[] | undefined) => {
    if (value && value.length > 0) {
      for (let item of this.props.data) {
        if (item.value === value[0]) {
          this.props.onChange(value[0]);
        }
      }
    }
  };

  render() {
    const { title, value, onChange, required, ...restProps } = this.props;
    let pickerValue: ReactText[];

    if (!value) {
      pickerValue = [];
    } else {
      pickerValue = [value];
    }

    return (
      <Picker
        styles={{
          actionText: {
            color: primary_color
          }
        }}
        cols={1}
        value={pickerValue}
        onChange={this.handleChange}
        {...restProps}
      >
        <Item title={title} required={required} disabled={restProps.disabled} />
      </Picker>
    );
  }
}

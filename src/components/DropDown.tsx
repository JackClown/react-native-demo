import React, { ReactText } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { PickerProps } from '@ant-design/react-native/lib/picker';

import Text from './Text';
import { font_size, grey_color } from '../config/theme';
import { antdStyles } from '../config/styles';
import { scaleSize } from '@/utils/scale';

function TextWrapper(props: { onPress?: () => void; extra?: any }) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text size='h3' color='dark'>
        {props.extra}
      </Text>
      <Icon name='arrow-down' size={font_size} color={grey_color} style={styles.icon} />
    </TouchableOpacity>
  );
}

interface Props extends Omit<PickerProps, 'data' | 'value'> {
  data: Array<{ label: string; value: ReactText }>;
  disabled: boolean;
  value: ReactText[] | ReactText;
  onChange: (value: ReactText[] | undefined) => void;
}

export default function DropDown(props: Props) {
  const { disabled, ...restProps } = props;

  let val = restProps.value;

  if (!Array.isArray(val)) {
    val = [val];
  }

  let data = restProps.data;

  if (data.length <= 0) {
    data = [{ label: val[0].toString(), value: val[0] }];
  }

  return disabled ? (
    <Text size='h3' color='light'>
      {val[0]}
    </Text>
  ) : (
    <Picker {...restProps} value={val} data={data} cols={1} styles={antdStyles.picker}>
      <TextWrapper />
    </Picker>
  );
}

DropDown.defaultProps = {
  disabled: false
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: scaleSize(10)
  }
});

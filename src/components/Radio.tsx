import React, { createContext, ReactText, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback, StyleProp } from 'react-native';

import Text from './Text';
import { scaleSize } from '@/utils/scale';
import { button_border_color, border_radius, primary_color } from '../config/theme';

const { Provider, Consumer } = createContext<{
  value: any;
  onPress: (value: any) => void;
}>({
  value: '',
  onPress: () => {}
});

interface Props<T> {
  value?: T;
  onChange: (value: T) => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function RadioGroup<T>(props: Props<T>) {
  const { value, onChange, children, style } = props;

  const ctx = {
    value,
    onPress: (val: T) => {
      onChange(val);
    }
  };

  return (
    <Provider value={ctx}>
      <View style={style ? [styles.radioGroup, style] : styles.radioGroup}>{children}</View>
    </Provider>
  );
}

interface RadioProps<T> {
  children?: ReactText;
  value: T;
  style?: StyleProp<ViewStyle>;
}

function RadioButton<T>(props: RadioProps<T>) {
  return (
    <Consumer>
      {({ value, onPress }) => {
        return props.value === value ? (
          <View style={[styles.activeButton, props.style]}>
            <Text size='h4' color='#fff'>
              {props.children}
            </Text>
          </View>
        ) : (
          <TouchableWithoutFeedback onPress={() => onPress(props.value)}>
            <View style={[styles.button, props.style]}>
              <Text size='h4' color='dark'>
                {props.children}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      }}
    </Consumer>
  );
}

export function Button(props: { active: boolean; onPress: () => void; children?: ReactNode }) {
  const { active, onPress, children } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={active ? styles.activeButton : styles.button}>
        <Text size='h4' color={active ? '#fff' : 'dark'}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const Radio: typeof RadioButton & { Group: typeof RadioGroup } = RadioButton as any;
Radio.Group = RadioGroup;

export default Radio;

const buttonStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: scaleSize(158),
  height: scaleSize(74),
  marginRight: scaleSize(18),
  marginTop: scaleSize(20),
  borderWidth: scaleSize(1),
  borderColor: button_border_color,
  borderRadius: border_radius
} as any;

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  button: buttonStyle,
  activeButton: {
    ...buttonStyle,
    borderColor: primary_color,
    backgroundColor: primary_color
  }
});

import React, { ComponentType } from 'react';
import { TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from 'react-native';

import ListItem, { ListItemProps } from './ListItem';
import NumberInput, { NumberInputProps } from './NumberInput';
import { whitespace_lg } from '../config/theme';
import { scaleSize } from '@/utils/scale';
import { useTheme } from './Theme';

const listItemStyles = {
  body: {
    paddingVertical: 0
  }
};

function createInputItem<T extends NumberInputProps | TextInputProps>(Input: ComponentType<T>) {
  return function (props: T & ListItemProps) {
    const { title, extra, style, styles, required, ...rest } = props;

    const {
      color,
      fontSize: { h3 }
    } = useTheme();

    let inputStyle: StyleProp<TextStyle> = [inputStyles.input, { color: color.dark, fontSize: h3 }, style];
    let itemStyles: ListItemProps['styles'] = listItemStyles;

    if (rest.editable === false) {
      inputStyle = [...inputStyle, { color: color.light }];
    }

    if (styles) {
      itemStyles = { ...listItemStyles, ...styles };
    }

    return (
      <ListItem title={title} extra={extra} styles={itemStyles} required={required}>
        <Input
          style={inputStyle}
          placeholderTextColor={color.light}
          returnKeyType='done'
          underlineColorAndroid='transparent'
          {...(rest as any)}
        />
      </ListItem>
    );
  };
}

const inputStyles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    position: 'relative',
    right: -whitespace_lg,
    height: scaleSize(110),
    padding: whitespace_lg,
    textAlign: 'right'
  }
});

export const NumberInputItem = createInputItem(NumberInput);
export const TextInputItem = createInputItem(TextInput);

export default TextInputItem;

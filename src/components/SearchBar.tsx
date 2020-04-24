import React, { ReactNode, useState, useRef } from 'react';
import { View, TextInput, TextInputProps, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';

import { whitespace, whitespace_lg } from '@/config/theme';
import { scaleSize } from '@/utils/scale';
import Icon from './Icon';
import { useTheme } from './Theme';

interface Props extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  extra?: ReactNode;
  onChangeText?: (value: string) => void;
  changeOnClear?: boolean;
}

export function Search(props: Omit<Props, 'extra'>) {
  const { changeOnClear, onChangeText, ...restProps } = props;

  const { color, fontSize } = useTheme();

  const [visible, setVisible] = useState(false);

  const input = useRef<TextInput>(null);

  const handleChange = (value: string) => {
    setVisible(!!value.length);

    if (onChangeText) {
      onChangeText(value);
    }
  };

  const handleClear = () => {
    input.current?.clear();
    setVisible(false);

    if (changeOnClear && onChangeText) {
      onChangeText('');
    }
  };

  return (
    <View style={[styles.inputContainer, { backgroundColor: color.foreground }]}>
      <Icon name='search' size={fontSize.h1} color={color.grey} />
      <TextInput
        returnKeyType='done'
        onChangeText={handleChange}
        style={[styles.input, { backgroundColor: color.foreground }]}
        placeholderTextColor={color.light}
        clearButtonMode='never'
        {...restProps}
        ref={input}
      />
      {visible && (
        <View style={styles.clearWrapper}>
          <TouchableOpacity onPress={handleClear} style={styles.clear}>
            <Ionicon name='close-circle' size={fontSize.h2} color={color.lighter} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function SearchBar(props: Props) {
  const { extra, style, ...restProps } = props;

  const { color } = useTheme();

  let containerStyle: StyleProp<ViewStyle> = [styles.container, { backgroundColor: color.background }];

  if (style) {
    containerStyle = [styles.container, style];
  }

  return (
    <View style={containerStyle}>
      <Search {...restProps} />
      {extra && <View style={styles.extra}>{extra}</View>}
    </View>
  );
}

SearchBar.Search = Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: whitespace_lg,
    paddingVertical: whitespace
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleSize(60),
    paddingRight: scaleSize(30),
    paddingLeft: scaleSize(10),
    borderRadius: scaleSize(30)
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: whitespace,
    paddingTop: 0,
    paddingBottom: 0
  },
  extra: {
    marginLeft: whitespace_lg
  },
  clearWrapper: {
    width: scaleSize(28),
    height: scaleSize(28),
    justifyContent: 'center',
    alignItems: 'center'
  },
  clear: {
    width: scaleSize(60),
    height: scaleSize(60),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

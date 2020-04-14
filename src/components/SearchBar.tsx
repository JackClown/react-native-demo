import React, { ReactNode } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StyleProp,
  ViewStyle
} from 'react-native';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  whitespace,
  whitespace_lg,
  font_size_h1,
  font_size_h4,
  lighter_color,
  whitespace_sm,
  font_size_h2,
  light_color,
  grey_color
} from '../config/theme';
import Icon from './Icon';
import { scaleSize } from '@/utils/scale';
import WhiteSpace from './WhiteSpace';
import { useTheme } from './Theme';

interface Props extends Omit<TextInputProps, 'onChange'> {
  style?: StyleProp<ViewStyle>;
  right?: ReactNode;
  onChange?: (value: string) => void;
}

interface SearchProps extends Omit<Props, 'right'> {
  type: 'light' | 'dark';
}

export function Search(props: SearchProps) {
  const { onChange, type, ...restProps } = props;

  const { color } = useTheme();

  let containerStyle;
  let inputStyle;
  let iconColor;
  let clearColor;

  if (type === 'light') {
    containerStyle = [styles.inputContainer, { backgroundColor: 'rgba(255,255,255,0.3)' }];
    inputStyle = [styles.input, { color: '#fff' }];
    iconColor = '#fff';
    clearColor = '#fff';
  } else {
    containerStyle = [styles.inputContainer, { backgroundColor: color.foreground }];
    inputStyle = [styles.input, { backgroundColor: color.foreground }];
    iconColor = grey_color;
    clearColor = lighter_color;
  }

  return (
    <View style={containerStyle}>
      <Icon name="search" size={font_size_h1} color={iconColor} />
      <WhiteSpace type="vertical" />
      <TextInput
        returnKeyType="done"
        onChangeText={onChange}
        style={inputStyle}
        placeholderTextColor={light_color}
        clearButtonMode={restProps.value ? 'always' : 'while-editing'}
        {...restProps}
      />
      {Platform.OS === 'android' && restProps.value ? (
        <View style={styles.clearWrapper}>
          <TouchableOpacity onPress={onChange ? () => onChange('') : undefined} style={styles.clear}>
            <Ionicon name="close-circle" size={font_size_h2} color={clearColor} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

Search.defaultProps = {
  type: 'dark'
};

export default function SearchBar(props: Props) {
  const { right, style, ...restProps } = props;

  const { color } = useTheme();

  let containerStyle: StyleProp<ViewStyle> = [styles.container, { backgroundColor: color.background }];

  if (style) {
    containerStyle = [styles.container, style];
  }

  return (
    <View style={containerStyle}>
      <Search {...restProps} />
      {right && <View style={styles.right}>{right}</View>}
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
    paddingRight: whitespace,
    paddingLeft: scaleSize(10),
    borderRadius: whitespace_lg
  },
  input: {
    flex: 1,
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: font_size_h4
  },
  right: {
    marginLeft: whitespace_lg
  },
  clearWrapper: {
    marginRight: whitespace_sm,
    width: scaleSize(28),
    height: scaleSize(28),
    justifyContent: 'center',
    alignItems: 'center'
  },
  clear: {
    width: scaleSize(44),
    height: scaleSize(44),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

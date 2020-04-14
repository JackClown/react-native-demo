import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInputProps
} from 'react-native';
import { Flex } from '@ant-design/react-native';

import { scaleSize } from '@/utils/scale';
import { primary_color, whitespace, font_size_h3, dark_color, whitespace_lg, light_color } from '@/config/theme';
import Text from './Text';

interface Props extends TextInputProps {
  onSubmit: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

interface State {
  value: string;
}

export default class FooterInput extends PureComponent<Props, State> {
  state: State = {
    value: ''
  };

  handleChange = (value: string) => {
    this.setState({ value });
  };

  handleSubmit = () => {
    const { value } = this.state;

    if (!value) return;

    this.props.onSubmit(value);

    this.setState({ value: '' });
  };

  // handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
  //   const key = e.nativeEvent.key;

  //   if (key === 'Enter') {
  //     this.handleSubmit();
  //   }
  // };

  render() {
    const { value } = this.state;
    const { style, onSubmit, ...rest } = this.props;

    return (
      <Flex style={[styles.wrapper, style]} align='start'>
        <View style={styles.inputWrapper}>
          <TextInput
            value={value}
            style={styles.input}
            multiline
            // onKeyPress={this.handleKeyPress}
            // autoFocus
            placeholderTextColor={light_color}
            underlineColorAndroid='transparent'
            onChangeText={this.handleChange}
            maxLength={125}
            {...rest}
          />
        </View>
        <TouchableOpacity onPress={this.handleSubmit}>
          <View style={styles.button}>
            <Text size='h3' color='#fff'>
              确定
            </Text>
          </View>
        </TouchableOpacity>
      </Flex>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingVertical: whitespace,
    paddingHorizontal: whitespace_lg
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(110),
    height: scaleSize(74),
    borderRadius: scaleSize(37),
    paddingVertical: scaleSize(24),
    backgroundColor: primary_color
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    minHeight: scaleSize(74),
    marginRight: whitespace,
    paddingHorizontal: whitespace,
    backgroundColor: '#F4F4F4',
    borderRadius: scaleSize(37)
  },
  input: {
    padding: 0, //multiline为true，即使加了padding=0，顶部还是会有留白，指定paddingTop=0会起作用
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    borderWidth: 0,
    fontSize: font_size_h3,
    color: dark_color
  }
});

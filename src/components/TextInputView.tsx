import React, { PureComponent, createRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback
} from 'react-native';

import Text from './Text';
import { font_size, dark_color } from '../config/theme';

interface Props extends TextInputProps {}

interface State {
  editing: boolean;
  value: string;
}

export default class TextInputView extends PureComponent<Props, State> {
  inputRef = createRef<TextInput>();

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value || '',
      editing: false
    };
  }

  showInput = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }

    this.setState({
      value: this.props.value || '',
      editing: true
    });
  };

  hideInput = () => {
    this.setState({ editing: false });

    if (this.props.onChangeText) {
      this.props.onChangeText(this.state.value);
    }
  };

  handleChangText = (value: string) => {
    this.setState({ value });
  };

  render() {
    const { value, style, placeholder, ...restProps } = this.props;

    return (
      <View style={style}>
        <TextInput
          ref={this.inputRef}
          {...restProps}
          style={styles.input}
          value={this.state.value}
          onBlur={this.hideInput}
          onChangeText={this.handleChangText}
          blurOnSubmit
          clearButtonMode='while-editing'
        />
        {this.state.editing === false && (
          <TouchableWithoutFeedback onPress={this.showInput}>
            <View style={styles.textWrapper}>
              {value ? <Text>{value}</Text> : <Text color='light'>{placeholder}</Text>}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: font_size,
    padding: 0,
    paddingTop: 0,
    color: dark_color
  },
  textWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  }
});

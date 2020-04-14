import React, { Fragment, PureComponent, createRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  DeviceEventEmitter,
  Platform,
  Keyboard,
  TextInput
} from 'react-native';
import _round from 'lodash/round';
import _debounce from 'lodash/debounce';

import Text from './Text';
import NumberInput from './NumberInput';
import { KEYBOARD_WILL_SHOW } from './Footer';
import { scaleSize } from '@/utils/scale';
import { font_size_h4, font_color_dark, primary_color } from '../config/theme';

interface Props {
  value: number;
  onChange: (value: number, type: 'input' | 'add' | 'subtract') => void;
  precision: number;
  radix: number;
  size: 'md' | 'lg';
  autoSubmit: boolean;
  enableInput: boolean;
}

interface State {
  showInput: boolean;
  value: number;
}

const plus = require('@/assets/img/plus.png');
const subtract = require('@/assets/img/subtract.png');
const addCart = require('@/assets/img/add-cart.png');

export default class SetAmount extends PureComponent<Props, State> {
  static defaultProps = {
    precision: 3,
    radix: 1,
    size: 'md',
    autoSubmit: false,
    enableInput: true
  };

  inputRef = createRef<TextInput>();

  constructor(props: Props) {
    super(props);

    this.state = {
      showInput: false,
      value: props.value
    };
  }

  handleAdd = () => {
    let value;

    if (this.state.showInput) {
      value = this.state.value + this.props.radix;
      this.setState({ value });
    } else {
      value = this.props.value + this.props.radix;
      this.props.onChange(value, 'add');
    }
  };

  handleSubtract = () => {
    if (this.state.showInput) {
      let value = this.state.value - this.props.radix;

      if (value < 0) value = 0;

      this.setState({ value });
    } else {
      let value = this.props.value - this.props.radix;

      if (value < 0) value = 0;

      this.props.onChange(value, 'subtract');
    }
  };

  showInput = () => {
    if (this.props.enableInput === false) return;

    DeviceEventEmitter.emit(KEYBOARD_WILL_SHOW);

    this.setState({ showInput: true, value: this.props.value });

    if (Platform.OS === 'android') {
      const listener = Keyboard.addListener('keyboardDidHide', () => {
        if (this.inputRef.current && this.inputRef.current.isFocused()) {
          this.inputRef.current.blur();
        }

        listener.remove();
      });
    }
  };

  hideInput = () => {
    this.setState({ showInput: false });

    if (!this.props.autoSubmit) {
      this.props.onChange(this.state.value, 'input');
    }
  };

  handleChange = (value: number) => {
    this.setState({ value });

    if (this.props.autoSubmit) {
      this.changePropValue(value);
    }
  };

  changePropValue = (value: number) => {
    this.props.onChange(value, 'input');
  };

  render() {
    const { value, size, precision } = this.props;
    const { showInput } = this.state;
    const expanded = value > 0 || showInput;

    return (
      <View style={styles.container}>
        {expanded ? (
          <Fragment>
            <View style={styles.btnLeftWrapper}>
              <TouchableOpacity onPress={this.handleSubtract} style={styles.btnLeft}>
                <Image source={subtract} style={styles[size]} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              {showInput ? (
                <NumberInput
                  value={this.state.value}
                  onChangeText={this.handleChange}
                  style={styles.input}
                  onBlur={this.hideInput}
                  inputRef={this.inputRef}
                  blurOnSubmit
                  selectTextOnFocus
                  returnKeyType='done'
                  selectionColor={primary_color}
                  autoFocus
                />
              ) : (
                <TouchableOpacity onPress={this.showInput} style={styles.inputView}>
                  <Text size='h4' fontWeight='bold' color='dark'>
                    {_round(value, precision)}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Fragment>
        ) : null}
        <View style={styles.btnRightWrapper}>
          <TouchableOpacity onPress={this.handleAdd} style={styles.btnRight}>
            <Image source={expanded ? plus : addCart} style={styles[size]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  md: {
    width: scaleSize(44),
    height: scaleSize(44)
  },
  lg: {
    width: scaleSize(60),
    height: scaleSize(60)
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(80)
  },
  input: {
    width: '100%',
    padding: 0,
    height: scaleSize(44),
    textAlign: 'center',
    fontWeight: 'bold',
    color: font_color_dark,
    fontSize: font_size_h4
  },
  inputView: {
    width: '100%',
    height: scaleSize(44),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnLeftWrapper: {
    width: scaleSize(44),
    height: scaleSize(44),
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  btnLeft: {
    paddingVertical: scaleSize(15),
    paddingLeft: scaleSize(15)
  },
  btnRightWrapper: {
    width: scaleSize(44),
    height: scaleSize(44),
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  btnRight: {
    paddingVertical: scaleSize(15),
    paddingRight: scaleSize(15)
  }
});

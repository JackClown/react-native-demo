import React, { Fragment, Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
  StatusBar,
  DeviceEventEmitter
} from 'react-native';
import { Flex } from '@ant-design/react-native';
import ModalView from '@ant-design/react-native/lib/modal/ModalView';

import {
  font_size_h2,
  whitespace,
  whitespace_lg,
  light_color,
  font_size_h3,
  primary_color,
  dark_color
} from '@/config/theme';
import Icon from './Icon';
import Text from './Text';
import { scaleSize } from '@/utils/scale';
import { KEYBOARD_WILL_SHOW } from './Footer';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

interface State {
  value: string;
  visible: boolean;
}

export default class EditNotes extends Component<Props> {
  state: State = {
    value: '',
    visible: false
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextState.value !== this.state.value || nextState.visible !== this.state.visible) {
      return true;
    } else {
      return false;
    }
  }

  handleOpen = () => {
    DeviceEventEmitter.emit(KEYBOARD_WILL_SHOW);

    this.setState({
      visible: true,
      value: this.props.value
    });
  };

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  handleChange = (value: string) => {
    this.setState({
      value
    });
  };

  handleConfirm = () => {
    if (this.state.value !== this.props.value) {
      this.props.onChange(this.state.value.replace(/\n$/, ''));
    }

    this.setState({ visible: false });
  };

  handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const key = e.nativeEvent.key;

    if (key === 'Enter') {
      this.handleConfirm();
    }
  };

  render() {
    const { value, visible } = this.state;

    return (
      <Fragment>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.handleOpen}>
            <Icon name='message' size={font_size_h2} color='#838E8F' />
          </TouchableOpacity>
        </View>
        <ModalView
          animationType='slide-up'
          maskClosable
          wrapStyle={styles.container}
          visible={visible}
          onClose={this.handleClose}
          style={styles.content}
        >
          <TouchableWithoutFeedback onPress={this.handleClose}>
            <View style={styles.mask} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.select({
              ios: 0,
              android: StatusBar.currentHeight
            })}
          >
            <View style={styles.safeView}>
              <Flex style={styles.wrapper} align='start'>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={value}
                    style={styles.input}
                    multiline
                    onKeyPress={this.handleKeyPress}
                    autoFocus
                    placeholder='输入备注内容'
                    placeholderTextColor={light_color}
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                    returnKeyLabel='确定'
                    onChangeText={this.handleChange}
                    maxLength={125}
                  />
                </View>
                <TouchableOpacity onPress={this.handleConfirm}>
                  <View style={styles.button}>
                    <Text size='h3' color='#fff'>
                      确定
                    </Text>
                  </View>
                </TouchableOpacity>
              </Flex>
            </View>
          </KeyboardAvoidingView>
        </ModalView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(30),
    height: scaleSize(30)
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(80),
    height: scaleSize(80)
  },
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  safeView: {
    backgroundColor: '#fff'
  },
  wrapper: {
    paddingVertical: whitespace,
    paddingHorizontal: whitespace_lg
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
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
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(110),
    height: scaleSize(74),
    borderRadius: scaleSize(37),
    paddingVertical: scaleSize(24),
    backgroundColor: primary_color
  }
});

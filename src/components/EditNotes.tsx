import React, { Component } from 'react';
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

import { whitespace, whitespace_lg } from '@/config/theme';
import { scaleSize } from '@/utils/scale';
import Icon from './Icon';
import Text from './Text';
import { KEYBOARD_WILL_SHOW } from './Footer';
import { ThemeConsumer } from './Theme';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

interface State {
  value: string;
  visible: boolean;
}

export default class EditNotes extends Component<Props> {
  public state: State = {
    value: '',
    visible: false
  };

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextState.value !== this.state.value || nextState.visible !== this.state.visible) {
      return true;
    } else {
      return false;
    }
  }

  private handleOpen = () => {
    DeviceEventEmitter.emit(KEYBOARD_WILL_SHOW);

    this.setState({
      visible: true,
      value: this.props.value
    });
  };

  private handleClose = () => {
    this.setState({
      visible: false
    });
  };

  private handleChange = (value: string) => {
    this.setState({
      value
    });
  };

  private handleConfirm = () => {
    if (this.state.value !== this.props.value) {
      this.props.onChange(this.state.value.replace(/\n$/, ''));
    }

    this.setState({ visible: false });
  };

  private handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const key = e.nativeEvent.key;

    if (key === 'Enter') {
      this.handleConfirm();
    }
  };

  public render() {
    const { value, visible } = this.state;

    return (
      <ThemeConsumer>
        {({ color, fontSize }) => (
          <>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={this.handleOpen}>
                <Icon name='message' size={fontSize.h2} color={color.grey} />
              </TouchableOpacity>
            </View>
            <ModalView
              animationType='fade'
              maskClosable
              wrapStyle={styles.container}
              style={styles.content}
              visible={visible}
              onClose={this.handleClose}
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
                <Flex style={[styles.wrapper, { backgroundColor: color.foreground }]} align='start'>
                  <View style={[styles.inputWrapper, { backgroundColor: color.background }]}>
                    <TextInput
                      value={value}
                      style={[styles.input, { color: color.dark, fontSize: fontSize.h3 }]}
                      multiline
                      onKeyPress={this.handleKeyPress}
                      autoFocus
                      placeholder='输入备注内容'
                      placeholderTextColor={color.light}
                      underlineColorAndroid='transparent'
                      returnKeyType='done'
                      returnKeyLabel='确定'
                      onChangeText={this.handleChange}
                      maxLength={125}
                    />
                  </View>
                  <TouchableOpacity onPress={this.handleConfirm}>
                    <View style={[styles.button, { backgroundColor: color.primary }]}>
                      <Text size='h3' color='#fff'>
                        确定
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Flex>
              </KeyboardAvoidingView>
            </ModalView>
          </>
        )}
      </ThemeConsumer>
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
    borderRadius: scaleSize(37)
  },
  input: {
    padding: 0, //multiline为true，即使加了padding=0，顶部还是会有留白，指定paddingTop=0会起作用
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    borderWidth: 0
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(110),
    height: scaleSize(74),
    borderRadius: scaleSize(37),
    paddingVertical: scaleSize(24)
  }
});

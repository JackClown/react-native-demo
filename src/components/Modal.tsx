import React, { ReactNode, PureComponent, Fragment, ReactText, createRef } from 'react';
import { Portal } from '@ant-design/react-native';
import ModalView from '@ant-design/react-native/lib/modal/ModalView';
import {
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  ImageSourcePropType,
  KeyboardAvoidingView,
  TextInput,
  Platform
} from 'react-native';

import Text from './Text';
import { scaleSize, scaleFont } from '@/utils/scale';
import { whitespace, font_color_dark, font_color_grey, bottom_border_color, whitespace_lg } from '../config/theme';

interface Props {
  title: string;
  visible?: boolean;
  content: ReactText | ReactNode;
  actions: Array<{
    text: string;
    onPress?: () => void;
  }>;
  onClose?: () => void;
  avatar: ImageSourcePropType;
  children?: ReactNode;
  onAnimationEnd?: (visible: boolean) => void;
}

interface State {
  visible: boolean;
}

export function Button(props: { type: 'primary' | 'grey' | 'error'; onPress?: () => void; children: string }) {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#ddd' style={styles.button}>
      <Text size='h1' color={props.type}>
        {props.children}
      </Text>
    </TouchableHighlight>
  );
}

Button.defaultProps = {
  type: 'primary'
};

class Modal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    if (props.visible === undefined) {
      this.state = { visible: true };
    }
  }

  public onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }

    if (this.props.visible === undefined) {
      this.setState({ visible: false });
    }
  };

  render() {
    const { title, content, onAnimationEnd, actions, avatar } = this.props;

    const footer = actions.map(button => {
      const orginPress = button.onPress || function() {};

      return {
        ...button,
        onPress: () => {
          orginPress();
          this.onClose();
        }
      };
    });

    let visible;

    if (this.props.visible !== undefined) {
      visible = this.props.visible;
    } else {
      visible = this.state.visible;
    }

    return (
      <ModalView
        visible={visible}
        onAnimationEnd={onAnimationEnd}
        maskClosable
        animationType='fade'
        animateAppear={true}
        wrapStyle={styles.container}
        style={styles.outWrapper}
        onClose={this.onClose}
      >
        <View style={styles.wrapper}>
          <Image style={styles.type} source={avatar} />
          <View style={styles.innerContainer}>
            <View style={styles.body}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.content}>
                {typeof content === 'string' || typeof content === 'number' ? (
                  <Text numberOfLines={3} size='h3' color='grey'>
                    {content}
                  </Text>
                ) : (
                  content
                )}
              </View>
            </View>
            <View style={styles.footer}>
              {footer.length > 1 ? (
                footer.map((item, index) => (
                  <Fragment key={item.text}>
                    {index > 0 && <View style={styles.buttonGutter} />}
                    <Button type={index === 0 ? 'grey' : 'primary'} onPress={item.onPress}>
                      {item.text}
                    </Button>
                  </Fragment>
                ))
              ) : footer.length > 0 ? (
                <Button onPress={footer[0].onPress}>{footer[0].text}</Button>
              ) : (
                <Button onPress={() => this.onClose()}>确定</Button>
              )}
            </View>
          </View>
        </View>
      </ModalView>
    );
  }
}

const AlertModal = function(props: Props) {
  return <Modal {...props} />;
};

const error = require('@/assets/img/modal-error.png');
const warning = require('@/assets/img/modal-warning.png');
const edit = require('@/assets/img/modal-edit.png');

let prevModal: any;

AlertModal.alert = function(
  title: string,
  content: string | ReactNode,
  actions: Array<{ text: string; onPress?: () => void }> = [],
  type: 'warning' | 'error' | 'submit' | 'clear' | 'process' | 'reject' | ImageSourcePropType = 'warning',
  props: {
    maskClosable?: boolean;
  } = {}
) {
  let avatar: ImageSourcePropType;

  switch (type) {
    case 'error':
      if (prevModal === type) {
        return;
      }

      avatar = error;

      break;
    case 'warning':
    case 'submit':
    case 'clear':
    case 'process':
    case 'reject':
      avatar = warning;
      break;
    default:
      avatar = type;
  }

  prevModal = type;

  const key = Portal.add(
    <Modal
      {...props}
      title={title}
      content={content}
      actions={actions}
      avatar={avatar}
      onClose={() => {
        prevModal = undefined;
      }}
      onAnimationEnd={(visible: boolean) => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
};

AlertModal.error = (title: string, content: string) => AlertModal.alert(title, content, [], 'error');

interface PromptProps extends Omit<Props, 'content' | 'actions'> {
  defaultValue?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
}

class PromptModal extends PureComponent<PromptProps> {
  ref = createRef<Modal>();

  actions = [
    { text: '取消' },
    {
      text: '确定',
      onPress: () => {
        const { defaultValue, onChangeText } = this.props;

        if (this.value !== defaultValue && onChangeText) {
          onChangeText(this.value);
        }
      }
    }
  ];

  value: string = this.props.defaultValue || '';

  handleChangeText = (value: string) => {
    this.value = value;
  };

  handleClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  };

  handleSubmit = () => {
    if (this.ref.current) {
      this.ref.current.onClose();
    }
  };

  render() {
    const { defaultValue, placeholder, ...rest } = this.props;

    return (
      <Modal
        {...rest}
        ref={this.ref}
        actions={this.actions}
        onClose={this.handleClose}
        content={
          <KeyboardAvoidingView behavior={Platform.OS === 'android' ? undefined : 'padding'}>
            <TextInput
              placeholder={placeholder}
              maxLength={10}
              style={styles.input}
              defaultValue={defaultValue}
              onChangeText={this.handleChangeText}
              returnKeyType='done'
              onSubmitEditing={this.handleSubmit}
            />
          </KeyboardAvoidingView>
        }
      ></Modal>
    );
  }
}

AlertModal.prompt = function(
  title: string,
  callback: (value: string) => void,
  defaultValue: string,
  placeholder: string,
  avatar: ImageSourcePropType = edit
) {
  const key = Portal.add(
    <PromptModal
      title={title}
      avatar={avatar}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChangeText={callback}
      onAnimationEnd={(visible: boolean) => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  outWrapper: {
    width: scaleSize(560),
    minHeight: scaleSize(386),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  wrapper: {
    alignItems: 'center',
    width: '100%',
    minHeight: scaleSize(386),
    paddingTop: scaleSize(76),
    transform: [{ translateY: scaleSize(-76) }],
    backgroundColor: 'transparent'
  },
  type: {
    position: 'absolute',
    top: 0,
    width: scaleSize(125),
    height: scaleSize(125),
    zIndex: 1
  },
  innerContainer: {
    width: scaleSize(560),
    minHeight: scaleSize(310),
    backgroundColor: '#fff',
    borderRadius: scaleSize(20),
    overflow: 'hidden'
  },
  body: {
    alignItems: 'center',
    minHeight: scaleSize(219),
    paddingTop: scaleSize(90)
  },
  title: {
    fontSize: scaleFont(36),
    fontWeight: 'bold',
    color: font_color_dark
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: whitespace_lg,
    paddingVertical: whitespace,
    color: font_color_grey
  },
  footer: {
    flexDirection: 'row',
    height: scaleSize(90),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: bottom_border_color
  },
  button: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGutter: {
    width: StyleSheet.hairlineWidth,
    height: '100%',
    backgroundColor: bottom_border_color
  },
  input: {
    width: scaleSize(440),
    height: scaleSize(74),
    marginVertical: whitespace,
    paddingHorizontal: whitespace,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    borderRadius: scaleSize(8)
  }
});

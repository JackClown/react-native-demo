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
import { scaleSize } from '@/utils/scale';
import { ThemeConsumer, ThemeType, useTheme } from './Theme';
import { whitespace, whitespace_lg } from '../config/theme';

interface Props {
  title: string;
  visible?: boolean;
  content: ReactText | ReactNode;
  actions: {
    text: string;
    onPress?: () => void;
  }[];
  onClose?: () => void;
  avatar: ImageSourcePropType;
  children?: ReactNode;
  onAnimationEnd?: (visible: boolean) => void;
}

interface State {
  visible: boolean;
}

function Button(props: { type: 'primary' | 'grey' | 'error'; onPress?: () => void; children: string }) {
  const { color } = useTheme();

  return (
    <TouchableHighlight onPress={props.onPress} underlayColor={color.background} style={styles.button}>
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
    const { onClose, visible } = this.props;

    if (onClose) {
      onClose();
    }

    if (visible === undefined) {
      this.setState({ visible: false });
    }
  };

  private renderContent = ({ color }: ThemeType) => {
    const { title, content, onAnimationEnd, actions, avatar } = this.props;

    const footer = actions.map(button => {
      const orginPress = button.onPress || function () {};

      return {
        ...button,
        onPress: () => {
          orginPress();
          this.onClose();
        }
      };
    });

    let visible = this.state.visible;

    if (this.props.visible !== undefined) {
      visible = this.props.visible;
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
        <View style={[styles.wrapper]}>
          <Image style={styles.type} source={avatar} />
          <View style={[styles.innerContainer, { backgroundColor: color.foreground }]}>
            <View style={styles.body}>
              <Text size='lg' color='dark' fontWeight='bold'>
                {title}
              </Text>
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
            <View style={[styles.footer, { borderTopColor: color.line }]}>
              {footer.length > 1 ? (
                footer.map((item, index) => (
                  <Fragment key={item.text}>
                    {index > 0 && <View style={[styles.buttonGutter, { backgroundColor: color.line }]} />}
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
  };

  public render() {
    return <ThemeConsumer>{this.renderContent}</ThemeConsumer>;
  }
}

const AlertModal = function (props: Props) {
  return <Modal {...props} />;
};

const error = require('@/assets/img/modal-error.png');
const warning = require('@/assets/img/modal-warning.png');
const edit = require('@/assets/img/modal-edit.png');

let prevModal: any;

AlertModal.alert = function (
  title: string,
  content: string | ReactNode,
  actions: Array<{ text: string; onPress?: () => void }> = [],
  type: 'warning' | 'error' | 'edit' | ImageSourcePropType = 'warning',
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
      avatar = warning;
      break;
    case 'edit':
      avatar = edit;
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
              style={styles.input}
              defaultValue={defaultValue}
              onChangeText={this.handleChangeText}
              returnKeyType='done'
              onSubmitEditing={this.handleSubmit}
            />
          </KeyboardAvoidingView>
        }
      />
    );
  }
}

AlertModal.prompt = function (
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
    borderRadius: scaleSize(20),
    overflow: 'hidden'
  },
  body: {
    alignItems: 'center',
    minHeight: scaleSize(219),
    paddingTop: scaleSize(90)
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: whitespace_lg,
    paddingVertical: whitespace
  },
  footer: {
    flexDirection: 'row',
    height: scaleSize(90),
    borderTopWidth: StyleSheet.hairlineWidth
  },
  button: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGutter: {
    width: StyleSheet.hairlineWidth,
    height: '100%'
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

import React, { Fragment, ComponentType, Component } from 'react';
import { TouchableOpacity, StyleSheet, TextInputProps, ViewStyle, TextInput } from 'react-native';
import _round from 'lodash/round';

import Text from './Text';
import Modal from './Modal';
import NumberInput, { NumberInputProps } from './NumberInput';
import { scaleSize } from '@/utils/scale';

interface InputProps {
  style?: ViewStyle;
  required?: boolean;
  modalTitle?: string;
}

interface InputState {
  showModal: boolean;
  value?: string | number;
}

type ValuePropType<T> = T extends { value: number } ? number : string;

export function ModalInputMixin<T extends TextInputProps | NumberInputProps>(
  InputComponent: ComponentType<T>,
  defaultProps: {
    editable: boolean;
    modalTitle: string;
    required: boolean;
    [key: string]: any;
  } = { modalTitle: '', editable: true, required: false }
) {
  return class Input extends Component<T & InputProps, InputState> {
    static defaultProps = defaultProps;

    constructor(props: T & InputProps) {
      super(props);

      this.state = {
        showModal: false,
        value: props.value
      };
    }

    handleChangeText = (value: ValuePropType<T>) => {
      this.setState({ value });
    };

    handleSet = () => {
      if (this.state.value === '' && this.props.required) return;

      if (this.props.onChangeText) {
        this.props.onChangeText(this.state.value as any);
      }
    };

    openModal = () => {
      this.setState({
        showModal: true,
        value: this.props.value
      } as any);
    };

    closeModal = () => {
      this.setState({ showModal: false });
    };

    render() {
      const { value, style, editable, placeholder, ...restInputProps } = this.props;

      return (
        <Fragment>
          <TouchableOpacity
            onPress={editable ? this.openModal : undefined}
            style={[style, styles.count]}
            activeOpacity={editable ? undefined : 1}
          >
            <Text numberOfLines={1} size='h3' color={editable ? 'dark' : 'light'}>
              {value === undefined ? (
                <Text color='light' size='h3'>
                  {placeholder}
                </Text>
              ) : (
                value
              )}
            </Text>
          </TouchableOpacity>
          <Modal
            title={this.props.modalTitle as string}
            visible={this.state.showModal}
            onClose={this.closeModal}
            actions={[
              {
                text: '取消'
              },
              {
                text: '确定',
                onPress: this.handleSet
              }
            ]}
            avatar={require('@/assets/img/modal-edit.png')}
            content={
              <InputComponent
                {...(restInputProps as any)}
                value={this.state.value}
                autoFocus
                selectTextOnFocus
                keyboardType='number-pad'
                style={styles.inputCount}
                onChangeText={this.handleChangeText}
              />
            }
          />
        </Fragment>
      );
    }
  };
}

export const ModalNumberInput = ModalInputMixin(NumberInput, {
  precision: 3,
  editable: true,
  modalTitle: '输入数量',
  required: false
});

export const ModalTextInput = ModalInputMixin(TextInput, {
  editable: true,
  modalTitle: '输入条码',
  required: false
});

const styles = StyleSheet.create({
  count: {
    justifyContent: 'center'
  },
  inputCount: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    height: scaleSize(68),
    paddingTop: scaleSize(12),
    paddingBottom: scaleSize(12),
    borderRadius: scaleSize(6),
    textAlign: 'center'
  }
});

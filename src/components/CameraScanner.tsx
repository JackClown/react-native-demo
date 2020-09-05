import React, { Component, ReactElement } from 'react';
import {
  Modal,
  StyleSheet,
  DeviceEventEmitter,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { RNCamera, BarCodeType } from 'react-native-camera';
import { throttle } from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { scaleFont, scaleSize } from '@/utils/scale';

interface State {
  visible: boolean;
  top: Animated.Value;
}

interface Props {
  style?: StyleProp<ViewStyle>;
  onScanSuccess?: (value: string) => void;
  color: string;
  children?: ReactElement<{ onPress: () => void }>;
}

const { width, height } = Dimensions.get('window');

let size = width > height ? height : width;

size = size * 0.9;
export default class CameraScanner extends Component<Props, State> {
  static defaultProps = {
    color: '#fff'
  };

  public state: State = {
    visible: false,
    top: new Animated.Value(0)
  };

  private handleBarCodeRead = throttle(
    ({ data, type }: { data: string; type: keyof BarCodeType }) => {
      if (data) {
        this.closeModal();

        const { onScanSuccess } = this.props;

        let barcode = data;

        if (type === RNCamera.Constants.BarCodeType.ean13 && data[0] === '0') {
          barcode = data.slice(1);
        }

        if (onScanSuccess) {
          onScanSuccess(barcode);
        } else {
          DeviceEventEmitter.emit('onScanSuccess', barcode);
        }
      }
    },
    2000,
    { trailing: false }
  );

  public openModal = () => {
    this.setState({ visible: true }, () => {
      this.animate();
    });
  };

  public closeModal = () => {
    this.setState({ visible: false });
  };

  private animate = () => {
    Animated.timing(this.state.top, {
      toValue: size,
      duration: 3000,
      useNativeDriver: true
    }).start(() => {
      this.state.top.setValue(0);

      if (this.state.visible) {
        this.animate();
      }
    });
  };

  render() {
    const { children, style, color } = this.props;
    const { top, visible } = this.state;

    return (
      <>
        {children ? (
          React.cloneElement(children, {
            onPress: this.openModal
          })
        ) : (
          <TouchableOpacity onPress={this.openModal} style={style}>
            <Ionicon name='scan-outline' size={scaleFont(40)} color={color} />
          </TouchableOpacity>
        )}
        <Modal animationType='slide' visible={visible} onRequestClose={this.closeModal}>
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode='auto'
            autoFocus='on'
            captureAudio={false}
            permissionDialogTitle='获取相机权限'
            permissionDialogMessage='需要您的权限来访问相机'
            onBarCodeRead={this.handleBarCodeRead}
          >
            <StatusBar backgroundColor='#000' />
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={this.closeModal}>
                  <Icon name='closesquare' color='#fff' size={scaleFont(60)} />
                </TouchableOpacity>
              </View>
              <View style={styles.area}>
                <Animated.View style={{ transform: [{ translateY: top }] }}>
                  <Image source={require('@/assets/img/scanner.png')} resizeMode='contain' style={styles.image} />
                </Animated.View>
              </View>
            </SafeAreaView>
          </RNCamera>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: scaleSize(88),
    paddingLeft: scaleSize(30)
  },
  area: {
    alignItems: 'center',
    height: size
  },
  image: {
    width: size,
    height: size * 0.25,
    opacity: 0.9
  }
});

import React, { Component, ReactElement } from 'react';
import {
  Modal,
  StyleSheet,
  DeviceEventEmitter,
  View,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  SafeAreaView
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { throttle } from 'lodash';

import Icon from './Icon';
import HeaderBack from './HeaderBack';
import { scaleFont, scaleSize } from '@/utils/scale';
import { primary_color, whitespace } from '@/config/theme';

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

const size = Dimensions.get('window').height * 0.36;

export default class CameraScanner extends Component<Props, State> {
  static defaultProps = {
    color: '#fff'
  };

  state: State = {
    visible: false,
    top: new Animated.Value(0)
  };

  handleBarCodeRead = throttle(
    ({ data }: { data: string }) => {
      if (data) {
        this.closeModal();

        const { onScanSuccess } = this.props;

        if (onScanSuccess) {
          onScanSuccess(data);
        } else {
          DeviceEventEmitter.emit('onScanSuccess', data);
        }
      }
    },
    2000,
    { trailing: false }
  );

  openModal = () => {
    this.setState({ visible: true }, () => {
      this.animate();
    });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  animate = () => {
    Animated.timing(this.state.top, {
      toValue: size - 2,
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

    return (
      <>
        {children ? (
          React.cloneElement(children, {
            onPress: this.openModal
          })
        ) : (
          <TouchableOpacity onPress={this.openModal} style={[styles.iconContainer, style]}>
            <Icon name='scan' size={scaleFont(40)} color={color} />
          </TouchableOpacity>
        )}
        <Modal animationType='slide' visible={this.state.visible} onRequestClose={this.closeModal}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' />
            <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode='auto'
              autoFocus='on'
              captureAudio={false}
              onBarCodeRead={this.handleBarCodeRead}
            >
              <View style={styles.scanContainer}>
                <View style={styles.maskTop} />
                <View style={styles.containerCenter}>
                  <View style={styles.maskLeft} />
                  <View style={styles.capture}>
                    <Animated.View style={[styles.line, { transform: [{ translateY: this.state.top }] }]} />
                    <View style={styles.cornerTopRight} />
                    <View style={styles.cornerBottomRight} />
                    <View style={styles.cornerBottomLeft} />
                    <View style={styles.cornerTopLeft} />
                  </View>
                  <View style={styles.maskRight} />
                </View>
                <View style={styles.maskBottom} />
              </View>
              <View style={styles.header}>
                <HeaderBack onPress={this.closeModal} />
              </View>
            </RNCamera>
          </SafeAreaView>
        </Modal>
      </>
    );
  }
}

const cornerStyle: any = {
  position: 'absolute',
  width: size / 10,
  height: size / 10,
  borderColor: 'rgba(255,255,255, 0.5)'
};

const cornerBorderWidth = 4;
const maskColor = 'rgba(0,0,0,0.4)';

const styles = StyleSheet.create({
  iconContainer: {
    padding: whitespace
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000'
  },
  preview: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: scaleSize(88),
    paddingLeft: whitespace / 2
  },
  scanContainer: {
    flex: 1
  },
  containerCenter: {
    height: size,
    flexDirection: 'row'
  },
  maskTop: {
    flex: 1,
    backgroundColor: maskColor
  },
  maskRight: {
    flex: 1,
    backgroundColor: maskColor
  },
  capture: {
    alignItems: 'center',
    width: size,
    height: size,
    borderColor: '#000',
    borderWidth: 1
  },
  maskLeft: {
    flex: 1,
    backgroundColor: maskColor
  },
  maskBottom: {
    flex: 1.5,
    backgroundColor: maskColor
  },
  cornerTopRight: {
    ...cornerStyle,
    top: -cornerBorderWidth - 1,
    right: -cornerBorderWidth - 1,
    borderTopWidth: cornerBorderWidth,
    borderRightWidth: cornerBorderWidth
  },
  cornerBottomRight: {
    ...cornerStyle,
    right: -cornerBorderWidth - 1,
    bottom: -cornerBorderWidth - 1,
    borderBottomWidth: cornerBorderWidth,
    borderRightWidth: cornerBorderWidth
  },
  cornerBottomLeft: {
    ...cornerStyle,
    bottom: -cornerBorderWidth - 1,
    left: -cornerBorderWidth - 1,
    borderBottomWidth: cornerBorderWidth,
    borderLeftWidth: cornerBorderWidth
  },
  cornerTopLeft: {
    ...cornerStyle,
    top: -cornerBorderWidth - 1,
    left: -cornerBorderWidth - 1,
    borderTopWidth: cornerBorderWidth,
    borderLeftWidth: cornerBorderWidth
  },
  line: {
    backgroundColor: primary_color,
    width: size * 0.9,
    height: 1
  }
});

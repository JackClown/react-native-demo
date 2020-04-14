import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Platform,
  Modal
} from 'react-native';
import WebView, {
  WebViewProps,
  WebViewMessageEvent
} from 'react-native-webview';
import ImageViewer from 'react-native-image-zoom-viewer';

import { whitespace, whitespace_lg } from '@/config/theme';

interface Props extends WebViewProps {
  html: string;
  style?: StyleProp<ViewStyle>;
  showImage: boolean;
}

interface State {
  images: Array<{ url: string }>;
  index: number;
  visible: boolean;
}

export default class RichTextView extends PureComponent<Props, State> {
  static defaultProps = {
    showImage: false
  };

  state: State = {
    visible: false,
    index: 0,
    images: []
  };

  handlePressImage = ({ nativeEvent: { data } }: WebViewMessageEvent) => {
    const [index, ...imgs] = data.split('\n');

    this.setState({
      index: +index,
      visible: true,
      images: imgs.map(src => ({ url: src }))
    });
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { html, style, showImage, ...rest } = this.props;
    const { visible, images, index } = this.state;

    const content = html
      .replace(
        /(<img[^>]*?)width\s*?=\s*?(\'|\")\s*?\d+\s*?\2([^>]*?>)/g,
        '$1$3'
      )
      .replace(
        /(<img[^>]*?)height\s*?=\s*?(\'|\")\s*?\d+\s*?\2([^>]*?>)/g,
        '$1$3'
      );

    const source = {
      baseUrl: Platform.select({ ios: undefined, android: '' }),
      html: `
    <!DOCTYPE HTML>
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0" />
      <meta charset='utf-8' />
      <meta name="format-detection" content="telephone=no" />
      <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol';
      }
      img { width: 100% !important; }
      </style>
    </head>
    <html>
      <body>${content}</body>
      ${
        showImage
          ? `<script>
          window.addEventListener('click', function(e) {
            var target = e.target;
            if (target.tagName.toLowerCase() === 'img') {
              var imgs = document.querySelectorAll('img');
              var data = '';
              var index = 0;

              imgs.forEach(function(img, idx) {
                data += '\\n' + img.src;

                if (img.src === target.src) {
                  index = idx;
                }
              });

              window.postMessage(index + data);
            }
          } ,false);
          </script>`
          : ''
      }
    </html>
  `
    };

    return (
      <View style={[styles.container, style]}>
        <WebView
          source={source}
          {...rest}
          style={styles.webview}
          onMessage={this.handlePressImage}
        />
        {showImage ? (
          <Modal
            onRequestClose={this.handleClose}
            transparent
            visible={visible}>
            {images.length > 0 ? (
              <ImageViewer
                imageUrls={images as any}
                saveToLocalByLongPress={false}
                onClick={this.handleClose}
                index={index}
              />
            ) : null}
          </Modal>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: whitespace,
    paddingHorizontal: whitespace_lg
  },
  webview: {
    backgroundColor: 'transparent' //ios上会有一条奇怪的底部黑边，可以通过这个方式解决
  },
  wrap: {
    paddingTop: 0,
    width: '100%',
    height: '100%'
  },
  inner: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  body: {
    width: '100%',
    height: '100%',
    paddingBottom: 0,
    paddingHorizontal: 0
  },
  img: {
    width: '100%',
    height: '100%'
  }
});

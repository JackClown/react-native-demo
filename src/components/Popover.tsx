import React, { PureComponent, ReactElement, createRef, ReactNode, createContext } from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import PopoverView from 'react-native-popover-view';
import { scaleSize } from '@/utils/scale';
import { whitespace, whitespace_lg, bottom_border_color, background_color } from '@/config/theme';

interface Props {
  children?: ReactElement<any>;
  overlay: ReactNode;
}

interface ItemProps {
  onPress?: () => void;
  children?: ReactNode;
}

interface State {
  visible: boolean;
}

const { Provider, Consumer } = createContext<{
  close: () => void;
}>({
  close: () => {}
});

export default class Popover extends PureComponent<Props, State> {
  anchor = createRef<any>();

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  ctx: { close: () => void };

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false
    };

    this.ctx = {
      close: this.close
    };
  }

  static Item = function(props: ItemProps) {
    return (
      <Consumer>
        {({ close }) => {
          let handlePress;

          if (props.onPress) {
            handlePress = () => {
              close();

              props.onPress!();
            };
          } else {
            handlePress = undefined;
          }

          return (
            <TouchableHighlight underlayColor={background_color} onPress={handlePress} style={styles.item}>
              {props.children}
            </TouchableHighlight>
          );
        }}
      </Consumer>
    );
  };

  render() {
    const { children, overlay } = this.props;
    const { visible } = this.state;

    return (
      <Provider value={this.ctx}>
        <TouchableOpacity onPress={this.open} ref={this.anchor}>
          {children}
        </TouchableOpacity>
        <PopoverView
          placement='bottom'
          isVisible={visible}
          fromView={this.anchor.current}
          onRequestClose={this.close}
          popoverStyle={styles.popover}
          backgroundStyle={styles.background}
          arrowStyle={styles.arrow}
        >
          {overlay}
        </PopoverView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  popover: {
    width: scaleSize(240)
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  arrow: {
    width: whitespace,
    height: whitespace / 2
  },
  item: {
    width: '100%',
    height: scaleSize(72),
    paddingHorizontal: whitespace_lg,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: bottom_border_color
  }
});

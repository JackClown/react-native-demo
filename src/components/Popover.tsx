import React, { ReactElement, ReactNode, createContext, useRef, useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import PopoverView from 'react-native-popover-view';

import { scaleSize } from '@/utils/scale';
import { whitespace, whitespace_lg, bottom_border_color } from '@/config/theme';
import { useTheme } from './Theme';

interface Props {
  children?: ReactElement<any>;
  overlay: ReactNode;
}

interface ItemProps {
  onPress?: () => void;
  children?: ReactNode;
  noBorder?: boolean;
}

const { Provider, Consumer } = createContext<() => void>(() => {});

function Popover(props: Props) {
  const { children, overlay } = props;

  const anchor = useRef<any>();

  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const { color } = useTheme();

  return (
    <Provider value={close}>
      <TouchableOpacity onPress={() => setVisible(true)} ref={anchor}>
        {children}
      </TouchableOpacity>
      <PopoverView
        placement='bottom'
        isVisible={visible}
        fromView={anchor.current}
        onRequestClose={() => setVisible(false)}
        popoverStyle={StyleSheet.flatten([styles.popover, { backgroundColor: color.foreground }])}
        backgroundStyle={styles.background}
        arrowStyle={styles.arrow}
      >
        {overlay}
      </PopoverView>
    </Provider>
  );
}

function PopoverItem(props: ItemProps) {
  const { onPress, noBorder } = props;
  const { color } = useTheme();

  return (
    <Consumer>
      {close => {
        let handlePress;

        if (onPress) {
          handlePress = () => {
            close();

            onPress!();
          };
        } else {
          handlePress = undefined;
        }

        return (
          <TouchableHighlight
            underlayColor={color.background}
            onPress={handlePress}
            style={[styles.item, noBorder ? { borderBottomWidth: 0 } : undefined]}
          >
            {props.children}
          </TouchableHighlight>
        );
      }}
    </Consumer>
  );
}

Popover.Item = PopoverItem;

export default Popover;

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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: scaleSize(72),
    paddingHorizontal: whitespace_lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: bottom_border_color
  }
});

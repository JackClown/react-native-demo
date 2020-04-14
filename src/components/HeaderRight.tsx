import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { scaleSize } from '@/utils/scale';

interface Props {
  onPress?: () => void;
  amount?: number;
  children: ReactNode;
  showAmount: boolean;
}

export default function HeaderRight(props: Props) {
  let Wrapper: any;

  if (props.onPress) Wrapper = TouchableOpacity;
  else Wrapper = View;

  return (
    <Wrapper onPress={props.onPress} style={style.container}>
      {props.children}
      {props.amount ? (
        <View style={props.showAmount ? style.dot : style.miniDot}>
          {props.showAmount ? <Text style={style.dotText}>{props.amount}</Text> : null}
        </View>
      ) : null}
    </Wrapper>
  );
}

HeaderRight.defaultProps = {
  showAmount: true
};

const style = StyleSheet.create({
  container: {
    paddingVertical: scaleSize(20),
    paddingRight: scaleSize(30),
    paddingLeft: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    position: 'absolute',
    top: -5,
    right: 5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    fontSize: 12,
    backgroundColor: '#ff5b05',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotText: {
    color: '#fff'
  },
  miniDot: {
    position: 'absolute',
    top: -2,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff5b05'
  }
});

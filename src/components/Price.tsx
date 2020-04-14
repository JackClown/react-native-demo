import React, { Fragment } from 'react';
import { StyleProp, ViewStyle, Text as RNText, StyleSheet } from 'react-native';

import Authorized from './Authorized';
import Text from './Text';

interface Props {
  price: number | string;
  unit?: string;
  style?: StyleProp<ViewStyle>;
  authority?: string;
}

export default function Price(props: Props) {
  const { price, unit, style } = props;

  const view = (
    <Fragment>
      <Text color='primary' size='normal' fontWeight='bold'>
        ¥
      </Text>
      <Text color='primary' size='h3' fontWeight='bold'>
        {price + ' '}
      </Text>
    </Fragment>
  );

  return (
    <RNText style={[styles.container, style]}>
      {props.authority ? (
        <Authorized
          authority={props.authority}
          noMatch={
            <Text color='primary' size='h3' fontWeight='bold'>
              ***
            </Text>
          }
        >
          {view}
        </Authorized>
      ) : (
        view
      )}
      {unit !== undefined && (
        <Text color='grey' size='normal'>
          /{unit}
        </Text>
      )}
    </RNText>
  );
}

const styles = StyleSheet.create({
  container: {
    includeFontPadding: false
  }
});

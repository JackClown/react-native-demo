import React, { ReactNode, Fragment } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { whitespace, whitespace_lg } from '../config/theme';
import DashedBorder from './DashedBorder';
import Text from './Text';
import { useTheme } from './Theme';

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  styles?: {
    body?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
  };
  size: 'sm' | 'md' | 'lg';
}

export default function Card(props: Props) {
  const { style, size } = props;

  const { color } = useTheme();

  let containerStyle: StyleProp<ViewStyle> = [styles.container, { backgroundColor: color.foreground }];
  let bodyStyle: StyleProp<ViewStyle>;
  let headerStyle: StyleProp<ViewStyle>;

  if (style) {
    containerStyle = [containerStyle, style];
  }

  if (size === 'lg') {
    bodyStyle = styles.lgBody;
    headerStyle = styles.lgHeader;
  } else {
    bodyStyle = styles.body;
    headerStyle = styles.header;
  }

  if (props.styles) {
    const {
      styles: { body, header }
    } = props;

    if (body) {
      bodyStyle = [bodyStyle, body];
    }

    if (header) {
      headerStyle = [headerStyle, header];
    }
  }

  return (
    <View style={containerStyle}>
      {props.header && (
        <Fragment>
          <View style={headerStyle}>
            {typeof props.header === 'string' ? (
              <Text size="h1" color="dark" fontWeight="bold">
                {props.header}
              </Text>
            ) : (
              props.header
            )}
          </View>
          {props.children !== undefined && <DashedBorder />}
        </Fragment>
      )}
      {props.children !== undefined && <View style={bodyStyle}>{props.children}</View>}
      {props.footer && (
        <View>
          <DashedBorder />
          <View style={styles.footer}>{props.footer}</View>
        </View>
      )}
    </View>
  );
}

Card.defaultProps = {
  size: 'md'
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: whitespace_lg
  },
  header: {
    paddingTop: whitespace_lg,
    paddingBottom: whitespace,
    paddingRight: whitespace_lg
  },
  lgHeader: {
    paddingVertical: whitespace_lg,
    paddingRight: whitespace_lg
  },
  footer: {
    paddingVertical: whitespace,
    paddingRight: whitespace_lg
  },
  body: {
    paddingVertical: whitespace,
    paddingRight: whitespace_lg
  },
  lgBody: {
    paddingVertical: whitespace_lg,
    paddingRight: whitespace_lg
  }
});

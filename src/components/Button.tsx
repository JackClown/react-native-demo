import React, { ReactText } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from './Text';
import { scaleSize } from '@/utils/scale';
import { primary_color, button_border_color, error_color, warning_color } from '../config/theme';

interface Props {
  children?: ReactText;
  onPress?: () => void;
  disabled: boolean;
  shadow: boolean;
  size: 'sm' | 'lg' | 'md';
  type: 'primary' | 'ghost' | 'error' | 'warning';
}

export default function Button(props: Props) {
  const { onPress, children, disabled, size, shadow, type } = props;
  const btnStyles = styles[size];

  let btnType: 'primary' | 'ghost' | 'error' | 'warning' | 'disabled' = disabled ? 'disabled' : type;

  let shadowStyle;

  if (shadow) {
    shadowStyle = StyleSheet.flatten([styles.shadow[btnType], btnStyles.shadow]);
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={btnStyles.wrapper} activeOpacity={0.8}>
      <View style={[styles.common.content, styles.common[btnType], btnStyles.button, shadowStyle]}>
        <Text
          size={size === 'lg' || size === 'md' ? 'h1' : 'h3'}
          color={type === 'ghost' && !disabled ? 'grey' : '#fff'}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  disabled: false,
  shadow: false,
  size: 'md'
};

const common = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'visible'
  },
  primary: {
    backgroundColor: primary_color
  },
  error: {
    backgroundColor: error_color
  },
  warning: {
    backgroundColor: warning_color
  },
  ghost: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderColor: button_border_color
  },
  disabled: {
    backgroundColor: 'rgb(187,187,187)'
  }
});

const shadow = StyleSheet.create({
  primary: {
    shadowColor: '#4C9673',
    shadowOpacity: 0.63
  },
  ghost: {
    shadowColor: 'rgb(221, 221, 221)',
    shadowOpacity: 0.61
  },
  error: {},
  warning: {},
  disabled: {
    shadowColor: 'rgb(187,187,187)',
    shadowOpacity: 0.5
  }
});

const lg = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: scaleSize(90),
    alignItems: 'center'
  },
  button: {
    borderRadius: scaleSize(45)
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: scaleSize(8)
    },
    shadowRadius: scaleSize(7)
  }
});

const md = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: scaleSize(74),
    alignItems: 'center'
  },
  button: {
    borderRadius: scaleSize(37)
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: scaleSize(4)
    },
    shadowRadius: scaleSize(5)
  }
});

const sm = StyleSheet.create({
  wrapper: {
    width: scaleSize(200),
    height: scaleSize(74),
    alignItems: 'center'
  },
  button: {
    borderRadius: scaleSize(37)
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: scaleSize(3)
    },
    shadowRadius: scaleSize(9)
  }
});

const styles = { common, shadow, sm, lg, md };

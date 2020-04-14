import React, { ReactElement } from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { View, StyleProp, ViewStyle } from 'react-native';

import Popover from './Popover';
import Text from './Text';
import Icon from './Icon';
import { scaleSize } from '@/utils/scale';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { whitespace, whitespace_lg, whitespace_xs } from '@/config/theme';

export interface Action {
  icon?: ReactElement<any> | string;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}

interface Props {
  actions: Action[];
  collapsed?: boolean;
}

export default function HeaderOperators(props: Props) {
  let { actions, collapsed } = props;
  const len = actions.length;

  function getBtn(action: Action, index: number | undefined = undefined) {
    if (action.disabled) {
      return null;
    }

    let style: StyleProp<ViewStyle>;

    if (index === undefined || index === actions.length - 1) {
      style = styles.btn;
    } else {
      style = styles.smBtn;
    }

    return (
      <TouchableOpacity onPress={action.onPress} style={style} key={index}>
        {action.icon === undefined ? (
          <Text size='h3' color='#fff'>
            {action.title}
          </Text>
        ) : typeof action.icon === 'string' ? (
          <Icon name={action.icon} size={scaleSize(40)} color='#fff' />
        ) : (
          <Text size='h3' color='#fff'>
            {action.icon}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  if (len <= 0) {
    return null;
  } else if (len === 1) {
    const [action] = actions;

    return getBtn(action);
  } else {
    if (collapsed) {
      return (
        <Popover
          overlay={
            <>
              {actions.map((item, index) => {
                return (
                  <Popover.Item onPress={item.disabled ? undefined : item.onPress} key={index}>
                    <Text size='h3' color={item.disabled ? 'light' : 'dark'}>
                      {item.title}
                    </Text>
                  </Popover.Item>
                );
              })}
            </>
          }
        >
          <View style={styles.btn}>
            <AntdIcon name='ellipsis1' color='#fff' size={scaleSize(40)} />
          </View>
        </Popover>
      );
    } else {
      return <View style={styles.container}>{actions.map((item, index) => getBtn(item, index))}</View>;
    }
  }
}

HeaderOperators.defaultProps = {
  collapsed: true
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  smBtn: {
    padding: whitespace_xs,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    paddingVertical: whitespace,
    paddingRight: whitespace_lg,
    paddingLeft: whitespace_xs,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

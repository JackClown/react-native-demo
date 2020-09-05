import React, { ReactElement } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Popover from './Popover';
import Text from './Text';
import styles from '@/config/styles';
import { scaleSize } from '@/utils/scale';

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

    return (
      <TouchableOpacity onPress={action.onPress} style={styles.headerBtn} key={index}>
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
                  <Popover.Item
                    onPress={item.disabled ? undefined : item.onPress}
                    key={index}
                    noBorder={index === actions.length - 1}
                  >
                    <Text size='h3' color={item.disabled ? 'light' : 'dark'}>
                      {item.title}
                    </Text>
                  </Popover.Item>
                );
              })}
            </>
          }
        >
          <View style={styles.headerBtn}>
            <Icon name='ellipsis1' color='#fff' size={scaleSize(40)} />
          </View>
        </Popover>
      );
    } else {
      return <View style={style.container}>{actions.map((item, index) => getBtn(item, index))}</View>;
    }
  }
}

HeaderOperators.defaultProps = {
  collapsed: true
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

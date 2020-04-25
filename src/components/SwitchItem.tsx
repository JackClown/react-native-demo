import React, { ReactNode } from 'react';
import { Switch, SwitchProps, Platform } from 'react-native';

import ListItem from './ListItem';
import { useTheme } from './Theme';

export default function SwitchItem(props: { title: string | ReactNode; children?: ReactNode } & SwitchProps) {
  const { title, children, ...rest } = props;

  const { color } = useTheme();

  return (
    <ListItem
      title={title}
      extra={
        <Switch
          trackColor={{
            true: color.primary,
            false: '#bbb'
          }}
          {...(Platform.OS === 'android' ? { thumbColor: '#fff' } : {})}
          ios_backgroundColor={!rest.value ? color.background : color.primary}
          {...rest}
        />
      }
    >
      {children}
    </ListItem>
  );
}

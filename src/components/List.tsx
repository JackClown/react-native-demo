import React, { ReactNode } from 'react';
import { List as AntdList } from '@ant-design/react-native';
import { ListProps } from '@ant-design/react-native/lib/list';

import { useTheme } from './Theme';

interface Props extends Omit<ListProps, 'children'> {
  children?: ReactNode;
}

export default function CustomeList(props: Props) {
  const {
    color,
    fontSize: { h4 }
  } = useTheme();

  return (
    <AntdList
      {...(props as ListProps)}
      styles={{
        BodyBottomLine: { borderBottomColor: color.background, backgroundColor: color.background },
        Body: { borderTopColor: color.background },
        Header: {
          backgroundColor: color.background,
          fontSize: h4,
          color: color.grey
        }
      }}
    />
  );
}

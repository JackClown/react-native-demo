import React from 'react';
import { List as AntdList } from '@ant-design/react-native';
import { ListProps } from '@ant-design/react-native/lib/list';

import { useTheme } from './Theme';

interface Props extends ListProps {}

export default function CustomeList(props: Props) {
  const {
    color,
    fontSize: { h4 }
  } = useTheme();

  return (
    <AntdList
      {...props}
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

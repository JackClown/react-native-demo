import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { Page, SearchBar } from '@/components';
import { useTheme } from '@/components/Theme';

export default function SearchBarDemo() {
  const { fontSize, color } = useTheme();

  return (
    <Page>
      <SearchBar placeholder='测试' extra={<Icon name='filter' color={color.grey} size={fontSize.xl} />} />
    </Page>
  );
}

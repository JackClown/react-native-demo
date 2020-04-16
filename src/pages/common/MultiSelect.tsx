import React, { useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import { ParamList, Routes } from '@/config/routes';
import { useAsyncEffect } from '@/utils/hooks';
import { Modal, MultiSelect } from '@/components';

interface Props {
  navigation: NavigationProp<ParamList>;
  route: RouteProp<ParamList, Routes['Common']['MultiSelect']>;
}

export default function CommonMultiSelect(props: Props) {
  const { navigation, route } = props;
  const { value, onChange, fetch, placeholder } = route.params;

  const [data, setData] = useState<LabeledValue[]>([]);

  useAsyncEffect(async flag => {
    try {
      const data = await fetch();

      if (flag.cancelled) return;

      setData(data);
    } catch (err) {
      Modal.error('提示', err.message);
    }
  }, []);

  const keyExtractor = (item: LabeledValue) => {
    return item.value;
  };

  const labelExtractor = (item: LabeledValue) => {
    return item.label;
  };

  const filter = (item: LabeledValue, keywords: string) => {
    return item.label.includes(keywords);
  };

  const handleChange = (value: LabeledValue[]) => {
    navigation.goBack();
    onChange(value);
  };

  return (
    <MultiSelect
      value={value}
      data={data}
      filter={filter}
      keyExtractor={keyExtractor}
      labelExtractor={labelExtractor}
      onChange={handleChange}
      placeholder={placeholder || '输入名称查询'}
    />
  );
}

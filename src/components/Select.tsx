import React, { useState, useMemo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { debounce } from 'lodash';
import { NavigationProp } from '@react-navigation/native';

import { useAsyncEffect } from '@/utils/hooks';
import Page from './Page';
import SearchBar from './SearchBar';
import ListItem from './ListItem';
import Check from './Check';
import Modal from './Modal';
import Footer from './Footer';
import Card from './Card';
import Button from './Button';
import Text from './Text';

interface Props<T> {
  onChange: (value: T) => void;
  data: T[];
  value?: T;
  keyExtractor: (item: T) => string | number;
  labelExtractor: (item: T) => string | number;
  filter: (item: T, keywords: string) => boolean;
  placeholder?: string;
}

export default function Select<T>(props: Props<T>) {
  const { onChange, keyExtractor, value, filter, data, labelExtractor, placeholder } = props;

  const [keywords, setKeywords] = useState('');
  const [checked, setChecked] = useState(value);

  const list = useMemo(() => data.filter(item => filter(item, keywords)), [data, keywords]);

  const changeKeywords = useCallback(
    debounce((keywords: string) => {
      setKeywords(keywords);
    }, 300),
    [setKeywords]
  );

  const handleCheck = (item: T) => {
    setChecked(item);
  };

  const renderItem = ({ item }: { item: T }) => {
    const key = keyExtractor(item);

    return (
      <ListItem
        extra={checked !== undefined && keyExtractor(checked) === key ? <Check checked /> : null}
        onPress={() => handleCheck(item)}>
        <Text size="h3" color="dark">
          {labelExtractor(item)}
        </Text>
      </ListItem>
    );
  };

  const extractor = (item: T) => keyExtractor(item).toString();

  const confirm = () => {
    if (checked !== undefined) {
      onChange(checked);
    }
  };

  return (
    <Page>
      <SearchBar onChange={changeKeywords} placeholder={placeholder} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 34 }}
        data={list}
        keyExtractor={extractor}
        renderItem={renderItem}
        extraData={checked}
      />
      <Footer>
        <Card>
          <Button type="primary" onPress={confirm} disabled={checked === undefined}>
            确定
          </Button>
        </Card>
      </Footer>
    </Page>
  );
}

Select.create = function <T extends string | number, K = any>(
  fetch: (query: K) => PromiseLike<LabeledValue<T>[]>,
  placeholder: string = '输入名称查询'
) {
  return function (props: {
    route: {
      params: {
        value: LabeledValue<T>;
        onChange: (value: LabeledValue<T>) => void;
      } & K;
    };
    navigation: NavigationProp<any>;
  }) {
    const { navigation, route } = props;
    const { value, onChange, ...query } = route.params!;

    const [data, setData] = useState<LabeledValue<T>[]>([]);

    useAsyncEffect(async flag => {
      try {
        const data = await fetch(query as any);

        if (flag.cancelled) return;

        setData(data);
      } catch (err) {
        Modal.error('提示', err.message);
      }
    }, []);

    const keyExtractor = (item: LabeledValue<T>) => {
      return item.value;
    };

    const labelExtractor = (item: LabeledValue<T>) => {
      return item.label;
    };

    const filter = (item: LabeledValue<T>, keywords: string) => {
      return item.label.includes(keywords);
    };

    const handleChange = (value: LabeledValue<T>) => {
      navigation.goBack();
      onChange(value);
    };

    return (
      <Select
        value={value}
        data={data}
        filter={filter}
        keyExtractor={keyExtractor}
        labelExtractor={labelExtractor}
        onChange={handleChange}
        placeholder={placeholder}
      />
    );
  };
};

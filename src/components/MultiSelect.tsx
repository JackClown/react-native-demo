import React, { useState, useMemo, useCallback } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { debounce } from 'lodash';
import { Flex } from '@ant-design/react-native';
import { NavigationProp } from '@react-navigation/native';

import { useAsyncEffect } from '@/utils/hooks';
import Page from './Page';
import SearchBar from './SearchBar';
import ListItem from './ListItem';
import Check from './Check';
import WhiteSpace from './WhiteSpace';
import Text from './Text';
import SubmitFooter from './SubmitFooter';
import Modal from './Modal';
import styles from '@/config/styles';

interface Props<T> {
  onChange: (value: T[]) => void;
  data: T[];
  value: T[];
  keyExtractor: (item: T) => string | number;
  labelExtractor: (item: T) => string | number;
  filter: (item: T, keywords: string) => boolean;
  placeholder: string;
}

export default function MultiSelect<T>(props: Props<T>) {
  const { onChange, keyExtractor, value, filter, data, labelExtractor, placeholder } = props;

  const [keywords, setKeywords] = useState('');
  const [checked, setChecked] = useState(new Map(value.map(item => [keyExtractor(item), item])));

  const list = useMemo(() => data.filter(item => filter(item, keywords)), [data, keywords, filter]);
  const isSelectAll = useMemo(() => {
    let flag = true;

    for (let item of list) {
      if (!checked.has(keyExtractor(item))) {
        flag = false;
        break;
      }
    }

    return flag;
  }, [list, checked, keyExtractor]);

  const changeKeywords = useCallback(
    debounce((keywords: string) => {
      setKeywords(keywords);
    }, 300),
    [setKeywords]
  );

  const handleCheck = (key: string | number, item: T) => {
    let nextChecked = new Map(checked);

    if (checked.has(key)) {
      nextChecked.delete(key);
    } else {
      nextChecked.set(key, item);
    }

    setChecked(nextChecked);
  };

  const selectAll = () => {
    let checked: Map<string | number, T>;

    if (isSelectAll) {
      checked = new Map();
    } else {
      checked = new Map(list.map(item => [keyExtractor(item), item]));
    }

    setChecked(checked);
  };

  const renderItem = ({ item }: { item: T; index: number }) => {
    const key = keyExtractor(item);

    return (
      <ListItem
        title={labelExtractor(item)}
        extra={<Check checked={checked.has(key)} />}
        onPress={() => handleCheck(key, item)}
      />
    );
  };

  const extractor = (item: T) => keyExtractor(item).toString();

  const confirm = () => {
    onChange([...checked].map(item => item[1]));
  };

  return (
    <Page>
      <SearchBar onChangeText={changeKeywords} placeholder={placeholder} changeOnClear />
      <FlatList
        contentContainerStyle={styles.list}
        data={list}
        keyExtractor={extractor}
        renderItem={renderItem}
        extraData={checked}
      />
      <SubmitFooter
        left={
          <TouchableWithoutFeedback onPress={selectAll}>
            <Flex align='center'>
              <Check checked={isSelectAll} />
              <WhiteSpace type='vertical' />
              <Text size='h3' color='dark'>
                全选
              </Text>
            </Flex>
          </TouchableWithoutFeedback>
        }
        center={
          <Text size='h3' color='dark'>
            已选：{checked.size}
          </Text>
        }
        right='确定'
        onSubmit={confirm}
      />
    </Page>
  );
}

MultiSelect.create = function <T extends string | number, K = any>(
  fetch: (query: K) => PromiseLike<LabeledValue<T>[]>,
  placeholder: string = '输入名称查询'
) {
  return function (props: {
    route: {
      params: {
        value: LabeledValue<T>[];
        onChange: (value: LabeledValue<T>[]) => void;
      } & K;
    };
    navigation: NavigationProp<any>;
  }) {
    const { route, navigation } = props;
    const { value, onChange, ...query } = route.params;

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

    const handleChange = (value: LabeledValue<T>[]) => {
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
        placeholder={placeholder}
      />
    );
  };
};

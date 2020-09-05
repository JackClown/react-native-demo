import React, { useState, useMemo, useCallback, ReactNode } from 'react';
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

interface Props<T> {
  onChange: (value: T[]) => void;
  data: T[];
  value: T[];
  keyExtractor: (item: T) => string | number;
  labelExtractor: (item: T) => string | number;
  filter: (item: T, keywords: string) => boolean;
  placeholder: string;
  renderItem?: (item: T, index: number) => ReactNode;
}

export default function MultiSelect<T>(props: Props<T>) {
  const { onChange, keyExtractor, value, filter, data, labelExtractor, placeholder, renderItem: render } = props;

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

  const renderItem = ({ item, index }: { item: T; index: number }) => {
    const key = keyExtractor(item);

    return (
      <ListItem extra={<Check checked={checked.has(key)} />} onPress={() => handleCheck(key, item)}>
        {render ? (
          render(item, index)
        ) : (
          <Text size='h3' color='dark'>
            {labelExtractor(item)}
          </Text>
        )}
      </ListItem>
    );
  };

  const extractor = (item: T) => keyExtractor(item).toString();

  const confirm = () => {
    onChange([...checked].map(item => item[1]));
  };

  return (
    <Page>
      <SearchBar onChangeText={changeKeywords} placeholder={placeholder} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 34 }}
        data={list}
        keyExtractor={extractor}
        renderItem={renderItem}
        extraData={checked}
        windowSize={3}
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

function create<T, K = any>(
  fetch: (query: K) => PromiseLike<T[]>,
  others: {
    placeholder?: string;
    keyExtractor: (item: T) => string | number;
    labelExtractor: (item: T) => string | number;
    filter: (item: T, keywords: string) => boolean;
  }
): React.FC<{
  route: {
    params: {
      value: T[];
      onChange: (value: T[]) => void;
    };
  };
  navigation: NavigationProp<any>;
}>;

function create<T extends LabeledValue | LabeledValue<number> | LabeledValue<string>, K = any>(
  fetch: (query: K) => PromiseLike<T[]>,
  others?: {
    placeholder?: string;
  }
): React.FC<{
  route: {
    params: {
      value: T[];
      onChange: (value: T[]) => void;
    };
  };
  navigation: NavigationProp<any>;
}>;

function create<T, K extends object>(fetch: (query: K) => PromiseLike<T[]>, others: any = {}) {
  const {
    placeholder = '输入名称查询',
    keyExtractor = (item: LabeledValue) => item.value,
    labelExtractor = (item: LabeledValue) => item.label,
    filter = (item: LabeledValue, keywords: string) => item.label.includes(keywords)
  } = others;

  return function (props: {
    route: {
      params: {
        value: T[];
        onChange: (value: T[]) => void;
      } & K;
    };
    navigation: NavigationProp<any>;
  }) {
    const { navigation, route } = props;
    const { value, onChange, ...query } = route.params;

    const [data, setData] = useState<T[]>([]);

    useAsyncEffect(async flag => {
      try {
        const data = await fetch(query as K);

        if (flag.cancelled) return;

        setData(data);
      } catch (err) {
        Modal.error('提示', err.message);
      }
    }, []);

    const handleChange = (value: any[]) => {
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
}

MultiSelect.create = create;

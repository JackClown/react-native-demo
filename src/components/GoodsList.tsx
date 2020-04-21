import React, { createRef, RefObject, useState, useEffect } from 'react';
import { View, StyleSheet, ListRenderItemInfo } from 'react-native';

import { scaleSize } from '@/utils/scale';
import { useAsyncEffect } from '@/utils/hooks';
import GoodsCategories from './GoodsCategories';
import ListView, { ListProps } from './ListView';
import NoData from './NoData';
import Spin from './Spin';
import { useTheme } from './Theme';

interface Props<T> extends Pick<ListProps<T>, Exclude<keyof ListProps<T>, 'fetch' | 'filter'>> {
  listRef?: RefObject<ListView<any>>;
  fetchGoods: (params: { activeCategory: string; page: number; limit: number }) => Promise<T[]>;
  fetchCategories: () => Promise<TreeItem<string>[]>;
}

export default function GoodsList<T>(props: Props<T>) {
  const { listRef, fetchGoods, fetchCategories, renderItem, ...restProps } = props;

  const [categories, setCategories] = useState<TreeItem<string>[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const list = listRef ? listRef : createRef<ListView<any>>();

  useAsyncEffect(async flag => {
    try {
      const categories = await fetchCategories();

      if (flag.cancelled) {
        return;
      }

      setCategories(categories);

      if (categories.length > 0) {
        setActiveCategory(categories[0].key);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (activeCategory && list.current) {
      list.current.fetch();
    }
  }, [activeCategory]);

  const handleCategorySelect = (activeCategory: string) => {
    setActiveCategory(activeCategory);
  };

  const fetch = (params: { page: number; limit: number }) => {
    try {
      return fetchGoods({ ...params, activeCategory });
    } finally {
      setLoading(false);
    }
  };

  const ListEmptyComponent = () => {
    return <NoData text='加速备货中，敬请期待~' />;
  };

  const renderListItem = (props: ListRenderItemInfo<T>) => {
    if (renderItem) {
      return <View style={styles.itemWrapper}>{renderItem(props)}</View>;
    } else {
      return null;
    }
  };

  const { color } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: color.foreground }]}>
      <Spin loading={loading}>
        <GoodsCategories data={categories} activeKey={activeCategory} onPress={handleCategorySelect} />
        <ListView
          {...restProps}
          ref={list}
          fetch={fetch}
          renderItem={renderListItem}
          ListEmptyComponent={ListEmptyComponent}
        />
      </Spin>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  itemWrapper: {
    paddingVertical: scaleSize(20),
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(30)
  }
});

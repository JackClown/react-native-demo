import React, { PureComponent, createRef, RefObject } from 'react';
import { Image, View, StyleSheet, ListRenderItemInfo, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import GoodsCategories from './GoodsCategories';
import List, { ListProps } from './ListView';
import Text from './Text';
import NoData from './NoData';
import { scaleSize } from '@/utils/scale';
import { Global } from 'declarations';

interface State {
  activeCategory: string;
  loading: boolean;
}

interface Props<T> extends Pick<ListProps<T>, Exclude<keyof ListProps<T>, 'fetch' | 'filter' | 'keyExtractor'>> {
  categories: Global.TreeItem[];
  listRef?: RefObject<List<any>>;
  fetch: (params: { activeCategory: string; page: number; limit: number }) => Promise<T[]>;
}

export default class GoodsList<T = Global.Item> extends PureComponent<Props<T>, State> {
  state: State = {
    activeCategory: '',
    loading: true
  };

  list: RefObject<List<any>>;
  loadingView = createRef<Animatable.View>();

  constructor(props: Props<T>) {
    super(props);

    if (props.listRef) {
      this.list = props.listRef;
    } else {
      this.list = createRef();
    }
  }

  keyExtractor = (item: T) => (item as any).itemNum.toString();

  componentDidMount() {
    if (this.props.categories.length > 0) {
      this.handleCategorySelect(this.props.categories[0].key);
    }
  }

  componentDidUpdate({ categories }: Props<T>) {
    if (categories.length === 0 && this.props.categories.length > 0) {
      this.handleCategorySelect(this.props.categories[0].key);
    }
  }

  handleCategorySelect = (activeCategory: string) => {
    this.setState({ activeCategory }, () => {
      if (this.list.current) {
        this.list.current.fetch();
      }
    });
  };

  fetch = (params: { page: number; limit: number }) => {
    try {
      return this.props.fetch({ ...params, activeCategory: this.state.activeCategory });
    } finally {
      if (this.state.loading === true && this.loadingView.current && this.loadingView.current.fadeOut) {
        this.loadingView.current.fadeOut(600).then(() => {
          this.setState({ loading: false });
        });
      }
    }
  };

  ListEmptyComponent() {
    return <NoData type='goods' text='加速备货中，敬请期待~' />;
  }

  renderItem = (props: ListRenderItemInfo<T>) => {
    return <View style={styles.itemWrapper}>{this.props.renderItem(props)}</View>;
  };

  render() {
    const { categories, fetch, ...listProps } = this.props;

    return (
      <View style={styles.container}>
        <GoodsCategories
          data={this.props.categories}
          activeKey={this.state.activeCategory}
          onClick={this.handleCategorySelect}
        />
        <List<T>
          {...listProps}
          ref={this.list}
          fetch={this.fetch}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={this.ListEmptyComponent}
        />
        {this.state.loading && (
          <Animatable.View ref={this.loadingView as any} style={styles.loadingWrapper}>
            <SafeAreaView style={styles.loading}>
              <Image source={require('@/assets/img/loading.gif')} style={styles.loadingImage} />
              <Text size='normal' color='grey' style={styles.loadingText}>
                正在努力加载中...
              </Text>
            </SafeAreaView>
          </Animatable.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  itemWrapper: {
    paddingVertical: scaleSize(20),
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(30)
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2
  },
  loading: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  loadingImage: {
    width: scaleSize(112),
    height: scaleSize(260)
  },
  loadingText: {
    marginTop: scaleSize(38)
  }
});

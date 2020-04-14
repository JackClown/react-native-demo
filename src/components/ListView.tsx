import React, { PureComponent, ComponentType, ReactElement, isValidElement, createRef } from 'react';
import { ListRenderItem, View, FlatList, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import memoize from 'memoize-one';

import NoData from './NoData';
import { whitespace, grey_color } from '../config/theme';
import { scaleSize } from '@/utils/scale';

interface State<T> {
  page: number;
  data: T[];
  loading: boolean;
  refreshing: boolean;
  loadMore: number;
  network: boolean;
}

export interface ListProps<T> {
  preFetch?: boolean;
  fetch: (params: { page: number; limit: number }) => Promise<T[]>;
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  limit?: number;
  refreshable?: boolean;
  filter?: (item: T) => boolean;
  data?: T[]; //列表数据不再由List托管，即不再使用内部state
  onChange?: (data: T[]) => void; //同data
  ListEmptyComponent?: ComponentType<any> | ReactElement<any> | null;
  contentContainerStyle?: StyleProp<ViewStyle>;
  transparent?: boolean;
  extraData?: any;
}

export default class List<T = any> extends PureComponent<ListProps<T>, State<T>> {
  static defaultProps = {
    limit: 10,
    refreshable: true,
    preFetch: false,
    transparent: false
  };

  public state: State<T> = {
    loading: false,
    refreshing: false,
    loadMore: 2, //0 未加载，1 加载中，2 不能加载更多
    page: 1,
    data: [],
    network: true
  };

  private mounted: boolean = true;

  private flatList = createRef<FlatList<T>>();

  private get data() {
    return this.props.data || this.state.data;
  }

  public componentDidMount() {
    if (this.props.preFetch) {
      this.fetch();
    }
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  private getData(page: number = 1) {
    const { limit, fetch } = this.props;

    return fetch({ page, limit: limit! }).catch(err => {
      if (err === 'Network Error') {
        this.setState({ network: false });
      }

      return [];
    });
  }

  private lastFetchId: number = 0;

  /**
   * @param type number 判断是刷新还是重新加载 0为加载 1为刷新
   */
  public fetch = (type: number = 0) => {
    this.lastFetchId += 1;

    const fetchId = this.lastFetchId;
    const key: 'loading' | 'refreshing' = type === 0 ? 'loading' : 'refreshing';

    this.setState({ [key]: true, loadMore: 0 } as any);

    this.getData(1).then(data => {
      if (this.mounted === false) return;
      if (this.lastFetchId !== fetchId) return;

      const state: Partial<State<T>> = {
        page: 1,
        [key]: false
      };

      if (data.length < this.props.limit!) {
        state.loadMore = 2;
      }

      // 不把这块提取出来是为了尽可能把state合成一次，提升效率，因为在React上下文外，setState是同步的
      if (this.props.onChange) {
        this.props.onChange(data);
      } else {
        state.data = data;
      }

      this.setState(state as State<T>, () => {
        if (key === 'loading' && this.flatList.current) {
          this.flatList.current.scrollToOffset({
            offset: 0,
            animated: false
          });
        }
      });
    });
  };

  private handleRefresh = () => {
    if (this.props.refreshable) {
      this.fetch(1);
    }
  };

  private handleEndReached = () => {
    if (this.state.loadMore !== 0 || this.state.loading || this.state.refreshing) return;

    const { page } = this.state;

    this.setState({ loadMore: 1 });

    this.getData(page + 1).then(items => {
      if (this.mounted === false) return;

      let currPage = page;
      let currData = this.data;

      if (items.length > 0) {
        currPage += 1;
        currData = currData.concat(items);
      }

      const state: Partial<State<T>> = {
        page: currPage,
        loadMore: 0
      };

      if (items.length < this.props.limit!) {
        state.loadMore = 2;
      }

      if (this.props.onChange) {
        this.props.onChange(currData);
      } else {
        state.data = currData;
      }

      this.setState(state as State<T>);
    });
  };

  private ListEmptyComponent = () => {
    const { loading, network } = this.state;
    const { ListEmptyComponent } = this.props;
    let node;

    if (isValidElement(ListEmptyComponent)) {
      node = ListEmptyComponent;
    } else if (typeof ListEmptyComponent === 'function') {
      node = <ListEmptyComponent />;
    } else {
      node = <NoData text='暂无数据~' />;
    }

    return this.lastFetchId <= 0 || loading ? null : network ? node : <NoData text='网络找不到了~' />;
  };

  private ListFooterComponent = () => {
    return (
      <View style={styles.loadMore}>
        <ActivityIndicator color='#ddd' animating={this.state.loadMore === 1} />
      </View>
    );
  };

  public remove(item: T) {
    this.setState((prevState: State<T>) => {
      const index = prevState.data.indexOf(item);

      if (index >= 0) {
        const data = [...prevState.data];

        data.splice(index, 1);

        return { data };
      } else {
        return null;
      }
    });
  }

  public update(index: number, item: T) {
    this.setState((prevState: State<T>) => {
      const data = [...prevState.data];

      data[index] = item;

      return { data };
    });
  }

  private getExtraData = memoize((...args: any[]) => args);

  private getContentStyle = memoize((...args: StyleProp<ViewStyle>[]) => args);

  public render() {
    const { loading, refreshing, loadMore } = this.state;
    const { filter, contentContainerStyle, transparent, extraData, renderItem, keyExtractor } = this.props;
    let data = this.data;

    if (filter && data) {
      data = data.filter(filter);
    }

    return (
      <View style={transparent ? styles.transparentContainer : styles.container}>
        <FlatList
          ref={this.flatList}
          extraData={
            Array.isArray(extraData)
              ? this.getExtraData(loadMore, ...extraData)
              : this.getExtraData(loadMore, extraData)
          }
          refreshing={refreshing}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onRefresh={this.handleRefresh}
          windowSize={3}
          onEndReached={this.handleEndReached}
          contentContainerStyle={this.getContentStyle(
            data.length > 0 ? styles.list : styles.emptyList,
            contentContainerStyle
          )}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.ListFooterComponent}
          onEndReachedThreshold={0.1}
        />
        {loading && (
          <View style={[styles.loading, transparent ? { backgroundColor: 'transparent' } : undefined]}>
            <ActivityIndicator
              color={transparent ? '#fff' : grey_color}
              animating={true}
              size='large'
              toast={transparent}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  transparentContainer: {
    flex: 1
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 34
  },
  list: {
    paddingBottom: 34
  },
  loadMore: {
    justifyContent: 'center',
    height: scaleSize(50),
    padding: whitespace
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#fff'
  }
});

import React, { PureComponent, createRef, RefObject, ReactNode } from 'react';
import { debounce } from 'lodash';

import SearchBar from './SearchBar';
import List, { ListProps } from './ListView';
import Page from './Page';

interface State {
  keywords: string;
}

interface Props<T> extends Pick<ListProps<T>, Exclude<keyof ListProps<T>, 'fetch' | 'filter'>> {
  fetch: (params: { keywords: string; page: number; limit: number }) => Promise<T[]>;
  placeholder?: string;
  autoFocus?: boolean;
  preSearch?: boolean;
  delay?: number; //延迟时间，ms
  filter?: (item: T, keywords: string) => boolean; //启用现有数据过滤
  listRef?: RefObject<List<T>>;
  right?: ReactNode;
  extraData?: any;
  selectTextOnFocus?: boolean;
}

export default class Search<T = any> extends PureComponent<Props<T>, State> {
  static defaultProps = {
    placeholder: '搜索',
    autoFocus: false,
    preSearch: false,
    delay: 800
  };

  static List = List;

  private handleFilter?: (item: T) => boolean;

  private list: RefObject<List>;

  constructor(props: Props<T>) {
    super(props);

    this.state = { keywords: '' };

    const { filter, listRef } = props;

    if (filter) {
      this.handleFilter = (item: T) => filter(item, this.state.keywords);
    }

    //  由于ref是不可变的，并且是引用类型，所以可以这么做
    if (listRef) {
      this.list = listRef;
    } else {
      this.list = createRef();
    }
  }

  public componentDidMount() {
    if (this.props.preSearch && this.list.current) {
      this.list.current.fetch();
    }
  }

  private fetch = (params: { page: number; limit: number }) => {
    return this.props.fetch({
      keywords: this.state.keywords,
      ...params
    });
  };

  private handleChange = debounce((keywords: string) => {
    this.setState({ keywords }, () => {
      if (this.handleFilter === undefined && this.list.current) {
        this.list.current.fetch();
      }
    });
  }, 1000);

  public render() {
    const { keywords } = this.state;
    const { right, placeholder, autoFocus, extraData, selectTextOnFocus, ...restProps } = this.props;

    let extra: any = extraData;

    if (this.handleFilter) {
      extra = [extraData, keywords];
    }

    return (
      <Page>
        <SearchBar
          placeholder={placeholder}
          onChangeText={this.handleChange}
          autoFocus={autoFocus}
          extra={right}
          selectTextOnFocus={selectTextOnFocus}
        />
        <List {...restProps} ref={this.list} fetch={this.fetch} filter={this.handleFilter} extraData={extra} />
      </Page>
    );
  }
}

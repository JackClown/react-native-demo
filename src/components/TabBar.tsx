import React, { PureComponent, createRef, ReactText, ReactNode } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp
} from 'react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';
import { whitespace_lg } from '@/config/theme';

interface TabData {
  title: ReactNode;
  key?: ReactText;
  [key: string]: any;
}

interface Props {
  scrollable?: boolean;
  activeTab: number;
  style?: StyleProp<ViewStyle>;
  tabs: TabData[];
  onChange: (tab: TabData, index: number) => void;
}

export default class TabBar extends PureComponent<Props> {
  private flatList = createRef<FlatList<any>>();

  public componentDidMount() {
    if (this.props.scrollable) {
      this.scroll();
    }
  }

  private scroll = () => {
    setTimeout(() => {
      if (this.flatList.current) {
        this.flatList.current.scrollToIndex({
          index: this.props.activeTab,
          viewPosition: 0.5,
          animated: false
        });
      }
    }, 100);
  };

  private goToTab = (index: number) => {
    const { tabs, activeTab } = this.props;

    if (index !== activeTab) {
      this.props.onChange(tabs[index], index);
    }
  };

  private handlePress = (index: number) => {
    if (this.flatList.current) {
      this.flatList.current.scrollToIndex({
        index,
        viewPosition: 0.5
      });
    }

    this.goToTab(index);
  };

  public renderItem = ({ item, index }: { item: TabData; index: number }) => {
    const { activeTab } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} style={styles.scrollItem} onPress={() => this.handlePress(index)}>
        {this.renderItemContent(activeTab === index, item)}
      </TouchableOpacity>
    );
  };

  private renderItemContent(active: boolean, item: TabData) {
    return active ? (
      <View style={styles.tabBarItem}>
        <Text color='dark' size='h1'>
          {item.title}
        </Text>
        <Image style={styles.activeItemBorder} source={require('@/assets/img/tab-active.png')} />
      </View>
    ) : (
      <View style={styles.tabBarItem}>
        <Text color='grey' size='h3'>
          {item.title}
        </Text>
      </View>
    );
  }

  private keyExtractor(item: TabData, index: number) {
    if (item.key) {
      return item.key.toString();
    } else {
      return index.toString();
    }
  }

  public render() {
    const { tabs, activeTab, scrollable, style } = this.props;

    return (
      <View style={[styles.tabBar, style]}>
        {scrollable ? (
          <FlatList
            data={tabs}
            extraData={activeTab}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
            horizontal
            initialNumToRender={tabs.length}
            onScrollToIndexFailed={this.scroll}
            keyExtractor={this.keyExtractor}
            ref={this.flatList}
          />
        ) : (
          tabs.map((tab, index) => (
            <TouchableWithoutFeedback key={this.keyExtractor(tab, index)} onPress={() => this.goToTab(index)}>
              {this.renderItemContent(activeTab === index, tab)}
            </TouchableWithoutFeedback>
          ))
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: scaleSize(90),
    backgroundColor: '#fff'
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  activeItemBorder: {
    position: 'absolute',
    bottom: 0,
    width: scaleSize(75),
    height: scaleSize(25)
  },
  scrollItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: whitespace_lg
  }
});

export const tabBarStyles = styles;

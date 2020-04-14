import React, { PureComponent, Component } from 'react';
import { Image, View, StyleProp, ViewStyle, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';

import Text from './Text';
import { Global } from 'declarations';
import { scaleSize } from '@/utils/scale';
import { primary_color } from '../config/theme';

interface Props {
  data: Global.TreeItem[];
  style?: StyleProp<ViewStyle>;
  onClick?: (id: string) => void;
  activeKey?: string;
}

interface State {
  paths: string[];
}

function flatNodes(preKey: string, data: Global.TreeItem[]): string[] {
  let results: string[] = [preKey];

  data.forEach(item => {
    const key = preKey === '' ? item.key : preKey + ' ' + item.key;

    if (Array.isArray(item.children) && item.children.length > 0) {
      results = results.concat(flatNodes(key, item.children));
    } else {
      results.push(key);
    }
  });

  return results;
}

interface ItemProps {
  active: boolean;
  path: string;
  item: Global.TreeItem;
  onPress: (item: Global.TreeItem) => void;
}

interface ItemState {
  collapsed: boolean;
}

const caretUp = require('@/assets/img/caret-up.png');
const caretDown = require('@/assets/img/caret-down.png');

class MenuItem extends Component<ItemProps, ItemState> {
  state: ItemState = {
    collapsed: true
  };

  componentDidUpdate(preProps: ItemProps) {
    const { active } = this.props;
    const { collapsed } = this.state;

    if (preProps.active === false && active === true && collapsed === true) {
      this.setState({
        collapsed: false
      });
    }
  }

  handlePress = () => {
    this.props.onPress(this.props.item);

    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { item, path, onPress, active } = this.props;
    const unfolded = active && this.state.collapsed === false;

    return (
      <View key={item.key}>
        <TouchableOpacity onPress={this.handlePress} activeOpacity={1} style={styles.topMenuItem}>
          {active && <Image source={require('@/assets/img/active-category.png')} style={styles.activeBackground} />}
          <View style={styles.topMenuContent}>
            <Text size='normal' color={active ? '#fff' : 'dark'} numberOfLines={2}>
              {item.label}
            </Text>
            {active && item.children.length > 0 && (
              <Image source={unfolded ? caretUp : caretDown} style={styles.topMenuItemDown} />
            )}
          </View>
        </TouchableOpacity>
        {unfolded && (
          <View style={styles.subMenuItemsWrapper}>
            {item.children.map(childItem => {
              const selected = path === childItem.key;

              return (
                <TouchableOpacity key={childItem.key} activeOpacity={1} onPress={() => onPress(childItem)}>
                  <View style={[styles.menuItem, selected ? { backgroundColor: '#fff' } : null]}>
                    {selected && <View style={styles.menuItemLeftBorder} />}
                    <Text numberOfLines={2} color='primary'>
                      {childItem.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}

export default class SiderMenu extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paths: flatNodes('', props.data)
    };
  }

  componentDidUpdate({ data }: Props) {
    if (data !== this.props.data) {
      this.setState({
        paths: flatNodes('', this.props.data)
      });
    }
  }

  handleItemClick = (item: Global.TreeItem) => {
    if (item.key === this.props.activeKey) return;

    if (this.props.onClick) {
      this.props.onClick(item.key);
    }
  };

  render() {
    const { data, activeKey } = this.props;
    const { paths } = this.state;
    const reg = new RegExp(`(?:^${activeKey}| ${activeKey})$`);

    let currPath: string[] = [];
    const index = paths.findIndex(item => reg.test(item));

    if (index >= 0) {
      currPath = paths[index].split(' ');
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroller}>
          {data.map(item => {
            return (
              <MenuItem
                key={item.key}
                item={item}
                active={currPath[0] === item.key}
                path={currPath[1]}
                onPress={this.handleItemClick}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: scaleSize(180),
    backgroundColor: '#F5F6F6',
    zIndex: 1
  },
  scroller: {
    ...Platform.select({
      ios: {
        overflow: 'visible'
      } as any,
      android: {}
    }),
    paddingBottom: scaleSize(88)
  },
  subMenuItemsWrapper: {
    backgroundColor: '#C9DFD5'
  },
  activeBackground: {
    width: scaleSize(190),
    height: scaleSize(111),
    transform: [
      {
        translateY: scaleSize(-7)
      }
    ]
  },
  topMenuContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleSize(30)
  },
  topMenuItem: {
    position: 'relative',
    width: scaleSize(180),
    height: scaleSize(90),
    zIndex: 1
  },
  topMenuItemDown: {
    width: scaleSize(16),
    height: scaleSize(10),
    marginLeft: scaleSize(9)
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleSize(180),
    height: scaleSize(90),
    paddingHorizontal: scaleSize(30)
  },
  menuItemLeftBorder: {
    position: 'absolute',
    left: 0,
    top: scaleSize(25),
    width: scaleSize(8),
    height: scaleSize(40),
    borderRadius: scaleSize(4),
    backgroundColor: primary_color
  }
});

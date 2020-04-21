import React, { useState, useEffect, useMemo } from 'react';
import { Image, View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';
import { useTheme } from './Theme';

function flatNodes(preKey: string, data: TreeItem[]): string[] {
  let results: string[] = [preKey];

  data.forEach(item => {
    const key = preKey === '' ? item.key.toString() : preKey + ' ' + item.key;

    if (Array.isArray(item.children) && item.children.length > 0) {
      results = results.concat(flatNodes(key, item.children));
    } else {
      results.push(key);
    }
  });

  return results;
}

interface ItemProps<T extends string | number> {
  active: boolean;
  path: string;
  item: TreeItem<T>;
  onPress: (item: TreeItem<T>) => void;
}

const caretUp = require('@/assets/img/caret-up.png');
const caretDown = require('@/assets/img/caret-down.png');

function MenuItem<T extends string | number>(props: ItemProps<T>) {
  const { active, path, item, onPress } = props;

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(!active);
  }, [active]);

  const handlePress = () => {
    onPress(item);

    setCollapsed(!collapsed);
  };

  const { color } = useTheme();

  const unfolded = active && !collapsed;

  return (
    <View>
      <TouchableOpacity onPress={handlePress} activeOpacity={1} style={styles.topMenuItem}>
        {active && <Image source={require('@/assets/img/active-category.png')} style={styles.activeBackground} />}
        <View style={styles.topMenuContent}>
          <Text size='normal' color={active ? '#fff' : 'dark'} numberOfLines={2}>
            {item.label}
          </Text>
          {active && item.children !== undefined && item.children.length > 0 && (
            <Image source={unfolded ? caretUp : caretDown} style={styles.topMenuItemDown} />
          )}
        </View>
      </TouchableOpacity>
      {unfolded && item.children !== undefined && (
        <View style={styles.subMenuItemsWrapper}>
          {item.children.map(childItem => {
            const selected = path === childItem.key;

            return (
              <TouchableOpacity key={childItem.key} activeOpacity={1} onPress={() => onPress(childItem)}>
                <View style={[styles.menuItem, selected ? { backgroundColor: color.foreground } : null]}>
                  {selected && <View style={[styles.menuItemLeftBorder, { backgroundColor: color.primary }]} />}
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

interface Props<T extends string | number> {
  data: TreeItem<T>[];
  onPress?: (id: T) => void;
  activeKey?: T;
}

function SiderMenu<T extends string | number>(props: Props<T>) {
  const { data, onPress, activeKey } = props;

  const paths = useMemo(() => flatNodes('', data), [data]);

  const { color } = useTheme();

  const handlePress = (item: TreeItem<T>) => {
    if (item.key === activeKey) return;

    if (onPress) {
      onPress(item.key);
    }
  };

  const reg = new RegExp(`(?:^${activeKey}| ${activeKey})$`);

  let currPath: string[] = [];
  const index = paths.findIndex(item => reg.test(item));

  if (index >= 0) {
    currPath = paths[index].split(' ');
  }

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <ScrollView contentContainerStyle={styles.scroller}>
        {data.map(item => {
          return (
            <MenuItem
              key={item.key}
              item={item}
              active={currPath[0] === item.key}
              path={currPath[1]}
              onPress={handlePress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default SiderMenu;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(180),
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
    borderRadius: scaleSize(4)
  }
});

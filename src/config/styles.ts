import { StyleSheet } from 'react-native';
import { primary_color, error_color, whitespace, bottom_border_color, lighter_color } from './theme';

const styles = StyleSheet.create({
  headerBtn: {
    padding: whitespace
  },
  row: {
    flexDirection: 'row',
    marginLeft: -whitespace / 2,
    marginRight: -whitespace / 2
  },
  column: {
    flex: 1,
    marginHorizontal: whitespace / 2
  },
  list: {
    paddingBottom: 34
  }
});

export const antdStyles = {
  tabBar: {
    barItemTitle: { fontSize: 14 },
    tabs: { borderTopWidth: StyleSheet.hairlineWidth }
  },
  tabs: {
    bottomTabBarSplitLine: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: bottom_border_color
    },
    topTabBarSplitLine: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: bottom_border_color
    }
  },
  picker: {
    actionText: {
      color: primary_color
    }
  },
  swipeAction: {
    remove: {
      backgroundColor: error_color,
      color: '#fff'
    },
    edit: {
      backgroundColor: lighter_color,
      color: '#fff'
    }
  }
};

export default styles;

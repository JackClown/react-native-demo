import {
  background_color,
  primary_color,
  error_color,
  whitespace,
  bottom_border_color,
  lighter_color,
  whitespace_lg
} from './theme';
import { scaleSize } from '@/utils/scale';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';

const styles = {
  container: {
    flex: 1,
    backgroundColor: background_color
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
  },
  card: {
    marginBottom: whitespace
  },
  spec: {
    marginTop: scaleSize(12)
  },
  headerBtn: {
    padding: whitespace
  },
  separate: {
    horizontal: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      backgroundColor: bottom_border_color
    }
  },
  unit: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: scaleSize(120),
    height: scaleSize(60),
    marginLeft: whitespace_lg,
    paddingLeft: scaleSize(30),
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: lighter_color
  } as StyleProp<ViewStyle>,
  orderInfo: {
    padding: whitespace,
    backgroundColor: '#f8f8f8'
  },
  row: {
    flexDirection: 'row',
    marginLeft: -whitespace / 2,
    marginRight: -whitespace / 2
  } as StyleProp<ViewStyle>,
  column: {
    flex: 1,
    marginHorizontal: whitespace / 2
  } as StyleProp<ViewStyle>
};

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
  }
};

export default styles;

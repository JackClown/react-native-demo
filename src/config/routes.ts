import { RouteConfig } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export const Routes = {
  Home: 'homepage',
  Common: {
    Select: 'common/select',
    MultiSelect: 'common/multi-select'
  },
  Demo: {
    Index: 'demo/index',
    List: 'demo/list',
    Text: 'demo/text',
    Card: 'demo/card',
    Modal: 'demo/modal',
    ShadowCard: 'demo/shadow-card',
    Avatar: 'demo/avatar',
    Filter: 'demo/filter',
    GoodsItem: 'demo/goods-item',
    Button: 'demo/button'
  }
} as const;

export type Routes = typeof Routes;

export type ParamList = {
  [Routes.Home]: undefined;
  [Routes.Common.Select]: {
    title: string;
    value: LabeledValue;
    onChange: (value: LabeledValue) => void;
    fetch: () => Promise<LabeledValue[]>;
    placeholder?: string;
  };
  [Routes.Common.MultiSelect]: {
    title: string;
    value: LabeledValue[];
    onChange: (value: LabeledValue[]) => void;
    fetch: () => Promise<LabeledValue[]>;
    placeholder?: string;
  };
  [Routes.Demo.Index]: undefined;
  [Routes.Demo.List]: undefined;
  [Routes.Demo.Text]: undefined;
  [Routes.Demo.Card]: undefined;
  [Routes.Demo.Modal]: undefined;
  [Routes.Demo.ShadowCard]: undefined;
  [Routes.Demo.Avatar]: undefined;
  [Routes.Demo.Filter]: undefined;
  [Routes.Demo.GoodsItem]: undefined;
  [Routes.Demo.Button]: undefined;
};

export type ScreenConfig = RouteConfig<ParamList, any, any, StackNavigationOptions, never>;

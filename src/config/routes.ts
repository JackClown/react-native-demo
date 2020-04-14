import { RouteConfig } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export const Routes = {
  Home: 'homepage',
  Demo: {
    Index: 'demo/index'
  }
} as const;

export type Routes = typeof Routes;

export type ParamList = {
  [Routes.Home]: undefined;
  [Routes.Demo.Index]: undefined;
};

export type ScreenConfig = RouteConfig<ParamList, keyof ParamList, any, StackNavigationOptions, never>;

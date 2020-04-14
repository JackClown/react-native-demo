import { ReactElement } from 'react';
import { ImageRequireSource } from 'react-native';

import { Routes, ParamList } from './routes';

type State = {
  user: User;
};

export interface App {
  icon: ImageRequireSource | ReactElement<any>;
  key: string;
  name: string;
  path: keyof ParamList | ((state: State) => keyof ParamList);
  filter?: (state: State) => boolean;
  beforeEnter?: (state: State) => boolean;
}

const apps: {
  title: string;
  content: App[];
  filter?: (state: State) => boolean;
}[] = [
  {
    title: '商户管理',
    content: [
      {
        icon: require('@/assets/img/demo.png'),
        key: 'demo',
        name: 'Demo',
        path: Routes.Demo.Index
      }
    ]
  }
];

export function getApps(state: State) {
  return apps
    .filter(app => {
      if (app.filter) {
        return app.filter(state);
      } else {
        return true;
      }
    })
    .map(item => {
      return {
        title: item.title,
        content: item.content.filter(app => {
          if (app.filter) {
            return app.filter(state);
          }

          return true;
        })
      };
    })
    .filter(item => item.content.length > 0);
}

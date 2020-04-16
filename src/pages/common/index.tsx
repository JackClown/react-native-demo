import { ScreenConfig, ParamList } from '@/config/routes';
import { Routes } from '@/config/routes';
import { RouteProp } from '@react-navigation/native';

import Select from './Select';
import MultiSelect from './MultiSelect';

const screens: ScreenConfig[] = [
  {
    name: Routes.Common.Select,
    component: Select,
    options: ({ route }) => {
      return {
        title: (route as RouteProp<ParamList, Routes['Common']['Select']>).params.title
      };
    }
  },
  {
    name: Routes.Common.MultiSelect,
    component: MultiSelect,
    options: ({ route }) => {
      return {
        title: (route as RouteProp<ParamList, Routes['Common']['MultiSelect']>).params.title
      };
    }
  }
];

export default screens;

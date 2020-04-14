import { createIconSet } from 'react-native-vector-icons';

const map = {
  'edit': 0xe601,
  'select': 0xe602,
  'trash': 0xe603,
  'store': 0xe604,
  'scan': 0xe605,
  'search': 0xe606,
  'unselect': 0xe607,
  'tip': 0xe608,
  'message': 0xe609,
  'filter': 0xe60a,
  'delete': 0xe60b,
  'cart': 0xe60c,
  'back': 0xe60d,
  'label': 0xe60e,
  'pie': 0xe60f,
  'feet': 0xe610,
  'warning': 0xe611,
  'order': 0xe612,
  'ring': 0xe613,
  'flag': 0xe614,
  'statistic': 0xe615,
  'pencil': 0xe616,
  'smile': 0xe617,
  'line': 0xe618,
  'star': 0xe619
};

const Icon = createIconSet(map, 'iconfont', 'iconfont.ttf');

export default Icon;
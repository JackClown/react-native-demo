import { ScreenConfig } from '@/config/routes';
import { Routes } from '@/config/routes';
import Catelog from './Catelog';
import ListDemo from './List';
import TextDemo from './Text';
import CardDemo from './Card';
import ModalDemo from './Modal';
import ShadowCardDemo from './ShadowCard';
import AvatarDemo from './Avatar';
import FilterDemo from './Filter';
import GoodsItem from './GoodsItem';
import Button from './Button';
import GoodsList from './GoodsList';
import SearchBar from './SearchBar';
import Segment from './Segment';
import Timer from './Timer';

const screens: ScreenConfig[] = [
  {
    name: Routes.Demo.Index,
    component: Catelog,
    options: {
      title: 'Demo'
    }
  },
  {
    name: Routes.Demo.List,
    component: ListDemo,
    options: {
      title: 'List'
    }
  },
  {
    name: Routes.Demo.Text,
    component: TextDemo,
    options: {
      title: 'Text'
    }
  },
  {
    name: Routes.Demo.Card,
    component: CardDemo,
    options: {
      title: 'Card'
    }
  },
  {
    name: Routes.Demo.Modal,
    component: ModalDemo,
    options: {
      title: 'Modal'
    }
  },
  {
    name: Routes.Demo.ShadowCard,
    component: ShadowCardDemo,
    options: {
      title: 'ShadowCard'
    }
  },
  {
    name: Routes.Demo.Avatar,
    component: AvatarDemo,
    options: {
      title: 'Avatar'
    }
  },
  {
    name: Routes.Demo.Filter,
    component: FilterDemo,
    options: {
      title: 'Filter'
    }
  },
  {
    name: Routes.Demo.GoodsItem,
    component: GoodsItem,
    options: {
      title: 'GoodsItem'
    }
  },
  {
    name: Routes.Demo.Button,
    component: Button,
    options: {
      title: 'Button'
    }
  },
  {
    name: Routes.Demo.GoodsList,
    component: GoodsList,
    options: {
      title: 'GoodsList'
    }
  },
  {
    name: Routes.Demo.SearchBar,
    component: SearchBar,
    options: {
      title: 'SearchBar'
    }
  },
  {
    name: Routes.Demo.Segment,
    component: Segment,
    options: {
      title: 'Segment'
    }
  },
  {
    name: Routes.Demo.Timer,
    component: Timer,
    options: {
      title: 'Timer'
    }
  }
];

export default screens;

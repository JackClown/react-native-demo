import React, { ReactNode, useCallback } from 'react';
import { TabsProps, Tabs as AntdTabs } from '@ant-design/react-native/lib/tabs/Tabs';
import { TabBarPropsType } from '@ant-design/react-native/lib/tabs/PropsType';

import TabBar from './TabBar';

interface Props extends TabsProps {
  children?: ReactNode;
  scrollable?: boolean;
}

export default function Tabs(props: Props) {
  const { scrollable, ...restProps } = props;

  const renderTabBar = useCallback(
    (props: TabBarPropsType) => {
      const { tabs, activeTab, goToTab } = props;

      return (
        <TabBar tabs={tabs} activeTab={activeTab} onChange={(tab, index) => goToTab(index)} scrollable={scrollable} />
      );
    },
    [scrollable]
  );

  return <AntdTabs renderTabBar={renderTabBar} styles={tabsStyles} {...restProps} />;
}

const tabsStyles = {
  topTabBarSplitLine: {
    borderBottomWidth: 0
  }
};

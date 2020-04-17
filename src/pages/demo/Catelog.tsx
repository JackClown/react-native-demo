import React from 'react';
import { NavigationProp } from '@react-navigation/native';

import { ParamList, Routes } from '@/config/routes';
import { Page, List, ListItem, CameraScanner } from '@/components';

interface Props {
  navigation: NavigationProp<ParamList>;
}

export default function Catelog(props: Props) {
  const { navigation } = props;

  return (
    <Page>
      <List>
        <ListItem title='List' onPress={() => navigation.navigate(Routes.Demo.List)} arrow />
        <ListItem title='Text' onPress={() => navigation.navigate(Routes.Demo.Text)} arrow />
        <ListItem title='Card' onPress={() => navigation.navigate(Routes.Demo.Card)} arrow />
        <ListItem title='Modal' onPress={() => navigation.navigate(Routes.Demo.Modal)} arrow />
        <ListItem title='ShadowCard' onPress={() => navigation.navigate(Routes.Demo.ShadowCard)} arrow />
        <ListItem title='Avatar' onPress={() => navigation.navigate(Routes.Demo.Avatar)} arrow />
        <ListItem title='Filter' onPress={() => navigation.navigate(Routes.Demo.Filter)} arrow />
        <ListItem title='GoodsItem' onPress={() => navigation.navigate(Routes.Demo.GoodsItem)} arrow />
        <ListItem title='Button' onPress={() => navigation.navigate(Routes.Demo.Button)} arrow />
        <CameraScanner>
          <ListItem title='CameraScanner' />
        </CameraScanner>
      </List>
    </Page>
  );
}

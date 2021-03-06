import React from 'react';
import { NavigationProp } from '@react-navigation/native';

import { ParamList, Routes } from '@/config/routes';
import { Page, List, ListItem, CameraScanner, EditNotes } from '@/components';
import { ScrollView } from 'react-native';
import styles from '@/config/styles';

interface Props {
  navigation: NavigationProp<ParamList>;
}

export default function Catelog(props: Props) {
  const { navigation } = props;

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.list}>
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
          <ListItem title='CameraScanner' extra={<CameraScanner color='#666' />} />
          <ListItem title='GoodsList' onPress={() => navigation.navigate(Routes.Demo.GoodsList)} arrow />
          <ListItem title='Segment' onPress={() => navigation.navigate(Routes.Demo.Segment)} arrow />
          <ListItem title='EditNotes' extra={<EditNotes value='1' onChange={val => console.log(val)} />} />
          <ListItem title='Timer' onPress={() => navigation.navigate(Routes.Demo.Timer)} arrow />
          <ListItem title='HeaderOperators' onPress={() => navigation.navigate(Routes.Demo.HeaderOperators)} arrow />
        </List>
      </ScrollView>
    </Page>
  );
}

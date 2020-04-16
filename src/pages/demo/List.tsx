import React from 'react';
import { ScrollView, Alert } from 'react-native';

import { Page, List, ListItem, Text } from '@/components';

export default function ListDemo() {
  return (
    <Page>
      <ScrollView>
        <List renderHeader='Basic'>
          <ListItem title='Require' required />
          <ListItem title='Arrow' arrow onPress={() => Alert.alert('提示', 'hello world')} />
          <ListItem title='Body'>
            <Text>Text</Text>
          </ListItem>
          <ListItem title='Extra' extra='Extra Content' arrow onPress={() => {}} />
        </List>
        <List renderHeader='Custom'>
          <ListItem
            title={
              <Text size='h2' color='dark' fontWeight='bold'>
                Title
              </Text>
            }
          />
          <ListItem
            title='Title'
            extra={
              <Text size='h3' color='grey'>
                Extra
              </Text>
            }
            arrow
          />
        </List>
        <List renderHeader='Text Wrapper'>
          <ListItem title='Title' extra='Extra' arrow>
            <Text>
              Beauty Beauty Beauty BeautyBeauty BeautyBeauty BeautyBeauty BeautyBeauty BeautyBeauty BeautyBeauty
              BeautyBeauty BeautyBeauty BeautyBeauty Beauty
            </Text>
          </ListItem>
        </List>
      </ScrollView>
    </Page>
  );
}

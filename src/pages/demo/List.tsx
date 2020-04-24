import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';

import {
  Page,
  List,
  ListItem,
  Text,
  SwitchItem,
  PickerItem,
  NumberInputItem,
  InputItem,
  DatePickerItem
} from '@/components';
import styles from '@/config/styles';

export default function ListDemo() {
  const [flag, setFlag] = useState(true);

  const pickers = [
    {
      value: 1,
      label: '1'
    },
    {
      value: 2,
      label: '2'
    }
  ];

  const [picker, setPicker] = useState(1);

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.list}>
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
        <List renderHeader='Switch'>
          <SwitchItem title='Switch' value={flag} onValueChange={setFlag} />
        </List>
        <List renderHeader='Picker'>
          <PickerItem title='Picker' value={picker} data={pickers} onChange={setPicker} />
        </List>
        <List renderHeader='Input'>
          <NumberInputItem title='NumberInput' placeholder='只能输入数字' selectTextOnFocus />
          <InputItem title='InputItem' placeholder='输入' selectTextOnFocus />
        </List>
        <List renderHeader='DatePicker'>
          <DatePickerItem title='DatePicker' value='2020-04-24' onChange={value => console.log(value)} mode='date' />
        </List>
      </ScrollView>
    </Page>
  );
}

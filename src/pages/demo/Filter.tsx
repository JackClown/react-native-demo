import React, { useState } from 'react';
import { Modal, Flex } from '@ant-design/react-native';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Page, Filter, WhiteSpace, Text, PortalHost } from '@/components';
import { Item } from '@/components/Filter';
import { ParamList, Routes } from '@/config/routes';

interface Props {
  navigation: NavigationProp<ParamList>;
}

export default function FilterDemo(props: Props) {
  const { navigation } = props;

  const data = [
    {
      value: 1,
      label: '1'
    },
    {
      value: 2,
      label: '2'
    },
    {
      value: 3,
      label: '3'
    },
    {
      value: 4,
      label: '4'
    }
  ];

  const [value, setValue] = useState({
    radio: 1,
    checkbox: [data[0]],
    select: data[0],
    multiSelect: [data[0]]
  });

  type ValueType = typeof value;

  const filters: Item<ValueType>[] = [
    {
      key: 'radio',
      label: 'radio type',
      type: 'radio',
      group: data
    },
    {
      key: 'checkbox',
      label: 'checkbox type',
      type: 'checkbox',
      group: data
    },
    {
      key: 'select',
      label: 'select type',
      type: 'select',
      group: state =>
        new Promise(res => {
          navigation.navigate(Routes.Common.Select, {
            title: '选择',
            fetch: () => Promise.resolve(data),
            value: state.select,
            onChange: (val: LabeledValue) => {
              res(val);
            }
          });
        })
    },
    {
      key: 'multiSelect',
      label: 'multi select type',
      type: 'multi-select',
      group: state =>
        new Promise(res => {
          navigation.navigate(Routes.Common.MultiSelect, {
            title: '选择',
            fetch: () => Promise.resolve(data),
            value: state.multiSelect,
            onChange: (val: LabeledValue[]) => {
              res(val);
            }
          });
        })
    }
  ];

  const handleChange = (val: ValueType) => {
    setValue(val);
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);

  return (
    <Page>
      <ScrollView>
        <Filter value={value} data={filters} onChange={handleChange} />
        <WhiteSpace />
        <Flex justify='center'>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text size='h1' color='dark'>
              Open Modal
            </Text>
          </TouchableOpacity>
        </Flex>
        <WhiteSpace />
        <View style={{ height: 600 }}>
          <PortalHost>
            <Modal visible={visible} onClose={() => setVisible(false)}>
              <Filter value={value} data={filters} onChange={handleChange} />
            </Modal>
          </PortalHost>
        </View>
      </ScrollView>
    </Page>
  );
}

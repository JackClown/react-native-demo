import React from 'react';
import { Alert } from 'react-native';

import { Page, Button, Space } from '@/components';

export default function ButtonDemo() {
  return (
    <Page>
      <Space direction='vertical-reverse'>
        <Button type='primary'>primary btn</Button>
        <Button type='warning'>warning btn</Button>
        <Button type='error'>error btn</Button>
        <Button type='primary' size='lg'>
          lg btn
        </Button>
        <Button type='primary' size='sm'>
          sm btn
        </Button>
        <Button type='primary' onPress={() => Alert.alert('提示', 'hello world')}>
          press
        </Button>
        <Button type='primary' size='sm' disabled>
          disabled btn
        </Button>
      </Space>
    </Page>
  );
}

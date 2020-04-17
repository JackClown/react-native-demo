import React from 'react';
import { Alert } from 'react-native';

import { Page, Button, WhiteSpace } from '@/components';
import { whitespace, whitespace_lg } from '@/config/theme';

export default function ButtonDemo() {
  return (
    <Page style={{ paddingVertical: whitespace, paddingHorizontal: whitespace_lg }}>
      <Button type='primary'>primary btn</Button>
      <WhiteSpace />
      <Button type='warning'>warning btn</Button>
      <WhiteSpace />
      <Button type='error'>error btn</Button>
      <WhiteSpace />
      <Button type='primary' size='lg'>
        lg btn
      </Button>
      <WhiteSpace />
      <Button type='primary' size='sm'>
        sm btn
      </Button>
      <WhiteSpace />
      <Button type='primary' onPress={() => Alert.alert('提示' , 'hello world')}>press</Button>
      <WhiteSpace />
      <Button type='primary' size='sm' disabled>
        disabled btn
      </Button>

    </Page>
  );
}

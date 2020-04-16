import React from 'react';

import { Page, Text } from '@/components';
import { Flex } from '@ant-design/react-native';

export default function TextDemo() {
  return (
    <Page>
      <Flex direction='column' align='center'>
        <Text size='xl'>xl</Text>
        <Text size='lg'>lg</Text>
        <Text size='h1'>h1</Text>
        <Text size='h2'>h2</Text>
        <Text size='h3'>h3</Text>
        <Text size='h4'>h4</Text>
        <Text size='md'>md</Text>
        <Text size='sm'>sm</Text>
        <Text size={80}>custom</Text>
        <Text color='primary'>primary</Text>
        <Text color='warning'>warning</Text>
        <Text color='error'>error</Text>
        <Text color='info'>info</Text>
        <Text color='dark'>dark</Text>
        <Text color='grey'>grey</Text>
        <Text color='light'>light</Text>
        <Text color='#fff'>custom</Text>
      </Flex>
    </Page>
  );
}

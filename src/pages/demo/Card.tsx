import React from 'react';

import { Page, Text, Card, WhiteSpace } from '@/components';

export default function CardDemo() {
  return (
    <Page>
      <Card size='md'>
        <Text size='h3' color='dark'>
          md Card
        </Text>
      </Card>
      <WhiteSpace />
      <Card size='lg'>
        <Text size='h3' color='dark'>
          lg Card
        </Text>
      </Card>
      <WhiteSpace />
      <Card header='Header'>
        <Text size='h3' color='dark'>
          Content
        </Text>
      </Card>
      <WhiteSpace />
      <Card footer='Footer'>
        <Text size='h3' color='dark'>
          Content
        </Text>
      </Card>
    </Page>
  );
}

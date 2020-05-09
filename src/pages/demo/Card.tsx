import React from 'react';

import { Page, Text, Card } from '@/components';
import Space from '@/components/Space';

export default function CardDemo() {
  return (
    <Page>
      <Space>
        <Card size='md'>
          <Text size='h3' color='dark'>
            md Card
          </Text>
        </Card>
        <Card size='lg'>
          <Text size='h3' color='dark'>
            lg Card
          </Text>
        </Card>
        <Card header='Header'>
          <Text size='h3' color='dark'>
            Content
          </Text>
        </Card>
        <Card footer='Footer'>
          <Text size='h3' color='dark'>
            Content
          </Text>
        </Card>
      </Space>
    </Page>
  );
}

import React from 'react';
import { ScrollView, Alert } from 'react-native';

import { Page, Text, ShadowCard, Space } from '@/components';
import { whitespace_lg } from '@/config/theme';

export default function ShadowCardDemo() {
  return (
    <Page>
      <ScrollView>
        <Space style={{ paddingHorizontal: whitespace_lg }} direction='vertical-reverse'>
          <ShadowCard size='sm'>
            <Text size='h3' color='dark'>
              sm Card
            </Text>
          </ShadowCard>
          <ShadowCard>
            <Text size='h3' color='dark'>
              md Card
            </Text>
          </ShadowCard>
          <ShadowCard size='lg'>
            <Text size='h3' color='dark'>
              lg Card
            </Text>
          </ShadowCard>
          <ShadowCard onPress={() => Alert.alert('提示', 'onPress')}>
            <Text size='h3' color='dark'>
              press Card
            </Text>
          </ShadowCard>
        </Space>
      </ScrollView>
    </Page>
  );
}

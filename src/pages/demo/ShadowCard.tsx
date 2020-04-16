import React from 'react';
import { ScrollView, Alert } from 'react-native';

import { Page, Text, WhiteSpace, ShadowCard } from '@/components';
import { whitespace_lg, whitespace } from '@/config/theme';

export default function ShadowCardDemo() {
  return (
    <Page>
      <ScrollView contentContainerStyle={{ paddingHorizontal: whitespace_lg, paddingVertical: whitespace }}>
        <ShadowCard size='sm'>
          <Text size='h3' color='dark'>
            sm Card
          </Text>
        </ShadowCard>
        <WhiteSpace />
        <ShadowCard>
          <Text size='h3' color='dark'>
            md Card
          </Text>
        </ShadowCard>
        <WhiteSpace />
        <ShadowCard size='lg'>
          <Text size='h3' color='dark'>
            lg Card
          </Text>
        </ShadowCard>
        <WhiteSpace />
        <ShadowCard onPress={() => Alert.alert('提示', 'onPress')}>
          <Text size='h3' color='dark'>
            press Card
          </Text>
        </ShadowCard>
      </ScrollView>
    </Page>
  );
}

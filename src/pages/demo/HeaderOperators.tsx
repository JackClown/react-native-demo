import React from 'react';

import { HeaderOperators, Header, Page, Modal } from '@/components';

export default function AvatarDemo() {
  return (
    <Page>
      <Header
        left={
          <HeaderOperators
            actions={[
              {
                title: '编辑',
                onPress: () => Modal.alert('提示', '编辑')
              },
              {
                title: '删除',
                onPress: () => Modal.alert('提示', '删除')
              }
            ]}
          />
        }
        right={
          <HeaderOperators
            collapsed={false}
            actions={[
              {
                title: '1',
                onPress: () => Modal.alert('提示', '编辑')
              },
              {
                title: '编辑',
                onPress: () => Modal.alert('提示', '编辑')
              },
              {
                title: '删除',
                onPress: () => Modal.alert('提示', '删除')
              }
            ]}
          />
        }
      />
    </Page>
  );
}

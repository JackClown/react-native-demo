import React from 'react';

import { List, Page, ListItem, Modal } from '@/components';

export default function ModalDemo() {
  return (
    <Page>
      <List>
        <ListItem title='edit' onPress={() => Modal.alert('提示', 'xxxx', [], 'edit')} arrow />
        <ListItem title='warning' onPress={() => Modal.alert('提示', 'xxxx', [], 'warning')} arrow />
        <ListItem title='error' onPress={() => Modal.alert('提示', 'xxxx', [], 'error')} arrow />
        <ListItem
          title='custom'
          onPress={() => Modal.alert('提示', 'xxxx', [], require('@/assets/img/modal-edit.png'))}
          arrow
        />
        <ListItem title='simple error' onPress={() => Modal.error('提示', 'xxxx')} arrow />
        <ListItem
          title='actions'
          onPress={() => Modal.alert('提示', 'xxxx', [{ text: '取消' }, { text: '确定' }])}
          arrow
        />
        <ListItem
          title='promot'
          onPress={() =>
            Modal.prompt(
              '输入',
              val => {
                console.log(val);
              },
              '111',
              '输入内容'
            )
          }
          arrow
        />
      </List>
    </Page>
  );
}

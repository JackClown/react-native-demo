import React from 'react';
import { Page, List, ListItem, Avatar } from '@/components';

export default function AvatarDemo() {
  return (
    <Page>
      <List>
        <ListItem>
          <Avatar size='md' />
        </ListItem>
        <ListItem>
          <Avatar size='lg' />
        </ListItem>
        <ListItem>
          <Avatar size='xlg' />
        </ListItem>
      </List>
    </Page>
  );
}

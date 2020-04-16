import React from 'react';

import { Page, List, ListItem, GoodsItem, Price } from '@/components';

export default function GoodsItemDemo() {
  return (
    <Page>
      <List>
        <ListItem>
          <GoodsItem size='md' name='测试' spec='1斤1盒' />
        </ListItem>
        <ListItem>
          <GoodsItem size='lg' name='测试' spec='1斤1盒'>
            <Price price='100' unit='盒' />
          </GoodsItem>
        </ListItem>
        <ListItem>
          <GoodsItem size='xlg' name='测试' spec='1斤1盒' />
        </ListItem>
      </List>
    </Page>
  );
}

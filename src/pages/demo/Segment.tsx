import React from 'react';
import { Flex } from '@ant-design/react-native';

import { Page, Segment } from '@/components';
import { useTheme } from '@/components/Theme';

export default function SegmentDemo() {
  const { color } = useTheme();

  return (
    <Page>
      <Flex style={{ backgroundColor: color.primary }} justify='center'>
        <Segment
          styles={{
            activeColor: color.primary
          }}
          tabs={[
            {
              label: '日',
              value: '日'
            },
            {
              label: '月',
              value: '月'
            },
            {
              label: '周',
              value: '周'
            },
            {
              label: '自定义',
              value: '自定义'
            }
          ]}
        />
      </Flex>
    </Page>
  );
}

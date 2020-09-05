import React from 'react';
import { Text, Timer, Page, Card } from '@/components';

function TimerDemo() {
  return (
    <Timer
      time='2100-04-26 12:00:00'
      outOfTime={
        <Text size='md' color='dark'>
          到点了
        </Text>
      }
    />
  );
}

export default function () {
  return (
    <Page>
      <Timer.Provider duration={1000}>
        <Card>
          <TimerDemo />
        </Card>
      </Timer.Provider>
    </Page>
  );
}

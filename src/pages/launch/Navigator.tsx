import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useScreenOptions from '@/config/screeOptions';
import home from '@/pages/homepage';

const Stack = createStackNavigator();

export default function Navigator() {
  const screens = useMemo(() => {
    return [...home];
  }, []);

  const screenOptions = useScreenOptions();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {screens.map(item => (
          <Stack.Screen key={item.name} {...item} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

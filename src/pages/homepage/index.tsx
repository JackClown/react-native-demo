import React from 'react';
import { StyleSheet, Image, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { grey_color, primary_color } from '@/config/theme';
import { scaleSize } from '@/utils/scale';

import { useTheme } from '@/components/Theme';
import { Routes, ScreenConfig } from '@/config/routes';
import Home from './Home';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

function Index() {
  const iconStyle = {
    width: scaleSize(50),
    height: scaleSize(50)
  };

  const { color, fontSize } = useTheme();

  return (
    <>
      <StatusBar backgroundColor={color.primary} barStyle='light-content' />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: primary_color,
          inactiveTintColor: grey_color,
          style: {
            borderTopColor: color.line,
            backgroundColor: color.foreground,
            borderTopWidth: StyleSheet.hairlineWidth
          },
          labelStyle: {
            fontSize: fontSize.md
          }
        }}>
        <Tab.Screen
          name='home'
          component={Home}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <Image
                style={iconStyle}
                source={focused ? require('@/assets/img/homepage-active.png') : require('@/assets/img/homepage.png')}
              />
            )
          }}
        />
        <Tab.Screen
          name='settings'
          component={Settings}
          options={{
            tabBarLabel: '设置',
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <Image
                style={iconStyle}
                source={focused ? require('@/assets/img/setting-active.png') : require('@/assets/img/setting.png')}
              />
            )
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const screens: ScreenConfig[] = [
  {
    name: Routes.Home,
    component: Index,
    options: {
      headerShown: false
    }
  }
];

export default screens;

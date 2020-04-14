import React from 'react';
import { useColorScheme } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Provider as AntdProvider } from '@ant-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store, { persistor } from '@/store';
import { ThemeProvider, theme } from '@/components/Theme';
import Launch from '@/pages/launch';

export default function App() {
  const value = useColorScheme();

  return (
    <AntdProvider>
      <SafeAreaProvider>
        <ThemeProvider value={value ? theme[value] : theme.light}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Launch />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AntdProvider>
  );
}

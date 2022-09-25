/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet, useColorScheme
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import AppNavigationContainer from './app/navigation/app.navigation.container';
import { rootStore } from './app/store/redux-storage/root/store';

const store = rootStore;
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Provider store={store}>
        <AppNavigationContainer />
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

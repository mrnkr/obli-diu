import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';
import { colors, ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from './pages/Signup';
import Signin from './pages/Signin';

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios,
    }),
  },
};

const Stack = createStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
      <NavigationContainer
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{ headerMode: false }}>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default App;

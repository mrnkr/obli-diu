import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { colors, ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloProvider } from '@apollo/client';
import * as Events from 'react-native-simple-events';
import { AuthContextProvider } from 'shared/contexts/AuthContext';
import { ErrorContextProvider } from 'shared/contexts/ErrorContext';
import { LoadingContextProvider } from 'shared/contexts/LoadingContext';

import ErrorSnackbar from './components/ErrorSnackbar';
import client from './apollo/config';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Chatlist from './pages/Chatlist';
import Userslist from './pages/Userslist/Userslist';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Usage from './pages/Usage';
import Chat from './pages/Chat';

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

  const tokenProvider = useMemo(
    () => ({
      getToken: () => AsyncStorage.getItem('token'),
      subscribe: (next) => {
        next();
        Events.on('login', 'some-id', next);
        return {
          unsubscribe: () => Events.rm('login', 'some-id'),
        };
      },
    }),
    [],
  );

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
        <NavigationContainer
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <LoadingContextProvider>
            <ErrorContextProvider>
              <AuthContextProvider tokenProvider={tokenProvider}>
                <Stack.Navigator
                  initialRouteName="Signin"
                  screenOptions={{ headerMode: false }}>
                  <Stack.Screen name="Signin" component={Signin} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Chatlist" component={Chatlist} />
                  <Stack.Screen name="Userslist" component={Userslist} />
                  <Stack.Screen name="Usage" component={Usage} />
                  <Stack.Screen name="Settings" component={Settings} />
                  <Stack.Screen name="Chat" component={Chat} />
                </Stack.Navigator>
                <ErrorSnackbar />
              </AuthContextProvider>
            </ErrorContextProvider>
          </LoadingContextProvider>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

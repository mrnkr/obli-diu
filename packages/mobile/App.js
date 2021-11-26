import React, { useMemo } from 'react';
import { Platform, StatusBar } from 'react-native';
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
import Home from './pages/Home';
import Chat from './pages/Chat';
import CameraEffects from './pages/Camera/CameraEffects';
import ImagePreview from './pages/Camera/ImagePreview';
import FiltersPreview from './pages/Camera/FiltersPreview';

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
                  screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Signin" component={Signin} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Chat" component={Chat} />
                  <Stack.Screen
                    name="CameraEffects"
                    component={CameraEffects}
                  />
                  <Stack.Screen name="ImagePreview" component={ImagePreview} />
                  <Stack.Screen
                    name="FiltersPreview"
                    component={FiltersPreview}
                  />
                </Stack.Navigator>
                <ErrorSnackbar />
              </AuthContextProvider>
            </ErrorContextProvider>
          </LoadingContextProvider>
        </NavigationContainer>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

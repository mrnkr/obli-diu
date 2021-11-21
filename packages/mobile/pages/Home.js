import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import makeStyles from '../hooks/makeStyles';
import Chats from './Chats';
import UsersList from './UsersList';
import Usage from './Usage';
import Settings from './Settings';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const styles = useStyles();

  return (
    <Tab.Navigator styles={styles.self}>
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Icon name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={UsersList}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Usage"
        component={Usage}
        options={{
          tabBarLabel: 'Usage',
          tabBarIcon: ({ color, size }) => (
            <Icon name="show-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      padding: safeAreaInsets.top,
      marginTop: safeAreaInsets.top,
    },
  }),
);

export default Home;

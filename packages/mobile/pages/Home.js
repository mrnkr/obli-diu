import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import makeStyles from '../hooks/makeStyles';
import Chatlist from './Chatlist/Chatlist.js';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const styles = useStyles();

  return (
    <Tab.Navigator styles={styles.self}>
      <Tab.Screen
        name="Chats"
        component={Chatlist}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Icon name="comments" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Chatlist}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <Icon name="address-book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Usage"
        component={Chatlist}
        options={{
          tabBarLabel: 'Usage',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="show-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Chatlist}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
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
    },
  }),
);

export default Home;

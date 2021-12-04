import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ListItem, Divider, Avatar, Text, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApolloClient } from '@apollo/client';
import * as Events from 'react-native-simple-events';
import PropTypes from 'prop-types';
import gravatar from '../../shared/helpers/gravatar';
import makeStyles from '../hooks/makeStyles';
import useAuth from '../../shared/hooks/useAuth';

const statics = [
  {
    icon: 'clock',
    static: 'Total Time',
    time: 'Used for 1 hr, 9 min',
  },
  {
    icon: 'activity',
    static: 'Average Session Time',
    time: 'Used for 2 min',
  },
  {
    icon: 'send',
    static: 'Sent Messages',
    time: 'Total sent messages 16',
  },
  {
    icon: 'message-circle',
    static: 'Received Messages',
    time: 'Total received messages 20',
  },
];

const Settings = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const currentUser = useAuth();
  const apolloClient = useApolloClient();

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    await apolloClient.clearStore();
    Events.trigger('login');
    navigation.navigate('Signin');
  }, [apolloClient, navigation]);

  return (
    <View style={styles.self}>
      <ListItem>
        <Avatar
          size="large"
          title={currentUser.displayName}
          source={{ uri: gravatar(currentUser) }}
          rounded
        />
        <ListItem.Content>
          <ListItem.Title>{currentUser.displayName}</ListItem.Title>
          <ListItem.Subtitle>{currentUser.email}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Divider />
      <View style={styles.transparentSeparator} />
      <View>
        {statics.map((s, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={s.icon} type="feather" color={theme.colors.text} />
            <ListItem.Content>
              <ListItem.Title>{s.static}</ListItem.Title>
              <ListItem.Subtitle>{s.time}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View style={styles.transparentSeparator} />
      <TouchableOpacity onPress={logout}>
        <ListItem>
          <ListItem.Content>
            <View style={styles.actionView}>
              <Icon
                name="logout"
                style={styles.leftIcon}
                size={24}
                color={theme.colors.text}
              />
              <Text>Exit</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      marginBottom: safeAreaInsets.bottom,
      marginTop: safeAreaInsets.top,
    },
    title: {
      fontSize: 36,
      marginBottom: 16,
    },
    leftIcon: {
      marginRight: 8,
      width: 24,
    },
    button: {
      alignSelf: 'stretch',
    },
    actionView: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    transparentSeparator: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
    },
  }),
);

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;

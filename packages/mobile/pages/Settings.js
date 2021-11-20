import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { ListItem, Button, Divider, Avatar, Text } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApolloClient } from '@apollo/client';
import * as Events from 'react-native-simple-events';
import PropTypes from 'prop-types';
import gravatar from '../../shared/helpers/gravatar';
import makeStyles from '../hooks/makeStyles';
import useAuth from '../../shared/hooks/useAuth';

const Settings = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const currentUser = useAuth();
  const [checked, setChecked] = useState(false);
  const apolloClient = useApolloClient();

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    await apolloClient.clearStore();
    Events.trigger('login');
    navigation.navigate('Signin');
  }, [apolloClient, navigation]);

  return (
    <>
      <Divider />
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
      <TouchableOpacity onPress={logout}>
        <ListItem>
          <ListItem.Content>
            <View style={styles.actionView}>
              <Icon
                name="sign-out"
                style={styles.leftIcon}
                size={24}
                color={theme.colors.text}
              />
              <Text>Exit</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
      <Divider />
      <ListItem>
        <ListItem.Content>
          <View style={styles.actionView}>
            <ToggleSwitch
              isOn={checked}
              onColor="blue"
              offColor="gray"
              label={checked ? 'Light Theme' : 'Dark Theme'}
              labelStyle={{ color: theme.colors.text, fontWeight: '900' }}
              size="medium"
              onToggle={(value) => setChecked(value)}
            />
          </View>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginBottom: safeAreaInsets.bottom,
      marginTop: safeAreaInsets.top,
      paddingHorizontal: 16,
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
      paddingVertical: 30,
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

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import useChatrooms from 'shared/hooks/useChatrooms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Events from 'react-native-simple-events';
import { useApolloClient } from '@apollo/client';
import makeStyles from '../../hooks/makeStyles';
import ChatlistEmptyPlaceholder from './ChatlistEmptyPlaceholder';
import ChatroomListItem from './ChatroomListItem';

const Chatlist = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const chatrooms = useChatrooms();
  const apolloClient = useApolloClient();

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    await apolloClient.clearStore();
    Events.trigger('login');
    navigation.navigate('Signin');
  }, [apolloClient, navigation]);

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => <ChatroomListItem chatroom={item} />,
    [],
  );

  return (
    <>
      {/* <Header
        placement="left"
        centerComponent={{
          text: 'Chat App',
          style: styles.centerComponent,
        }}
        rightComponent={
          <Button
            type="clear"
            icon={<Icon name="logout" color={theme.colors.text} />}
            onPress={logout}
          />
        }
        containerStyle={styles.header}
      /> */}

      <FlatList
        style={styles.listContentContainer}
        keyExtractor={keyExtractor}
        data={chatrooms}
        renderItem={renderItem}
        ListEmptyComponent={<ChatlistEmptyPlaceholder />}
      />
    </>
  );
};

Chatlist.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.background,
    },
    centerComponent: {
      color: theme.colors.text,
      fontSize: 24,
    },
    listContentContainer: {
      paddingBottom: safeAreaInsets.bottom,
    },
  }),
);

export default Chatlist;

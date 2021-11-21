import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import useUsers from 'shared/hooks/useUsers';
import usersImNotChattingWith from 'shared/helpers/usersImNotChattingWith';
import useChatrooms from 'shared/hooks/useChatrooms';
import useAuth from 'shared/hooks/useAuth';
import { useTheme } from '@react-navigation/native';
import makeStyles from '../../hooks/makeStyles';
import UsersListItem from './UsersListItem';
import UsersListEmptyPlaceholder from './UsersListEmptyPlaceholder';

const UsersList = () => {
  const styles = useStyles();
  const theme = useTheme();
  const user = useAuth();
  const chatrooms = useChatrooms();
  const users = useUsers(usersImNotChattingWith(user, chatrooms));

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }) => <UsersListItem user={item} topDivider={index > 0} />,
    [],
  );

  return (
    <>
      <Header
        placement="left"
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        centerComponent={{ text: 'Users', style: styles.centerComponent }}
      />
      <FlatList
        style={styles.listContentContainer}
        keyExtractor={keyExtractor}
        data={users}
        renderItem={renderItem}
        ListEmptyComponent={<UsersListEmptyPlaceholder />}
      />
    </>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    centerComponent: {
      color: theme.colors.text,
      fontSize: 24,
    },
    listContentContainer: {
      paddingBottom: safeAreaInsets.bottom,
    },
  }),
);

export default UsersList;

import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import useUsers from 'shared/hooks/useUsers';
import usersImNotChattingWith from 'shared/helpers/usersImNotChattingWith';
import useChatrooms from 'shared/hooks/useChatrooms';
import useAuth from 'shared/hooks/useAuth';
import makeStyles from '../../hooks/makeStyles';
import UserslistItem from './UserslistItem';
import UserslistEmptyPlaceholder from './UserslistEmptyPlaceholder';

const Userslist = () => {
  const styles = useStyles();
  const user = useAuth();
  const chatrooms = useChatrooms();
  const users = useUsers(() => usersImNotChattingWith(user, chatrooms));

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => <UserslistItem chatroom={item} />,
    [],
  );

  return (
    <>
      <FlatList
        style={styles.listContentContainer}
        keyExtractor={keyExtractor}
        data={users}
        renderItem={renderItem}
        ListEmptyComponent={<UserslistEmptyPlaceholder />}
      />
    </>
  );
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

export default Userslist;

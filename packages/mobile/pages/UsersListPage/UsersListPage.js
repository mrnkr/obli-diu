import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import usersImNotChattingWith from 'shared/helpers/usersImNotChattingWith';
import useChatrooms from 'shared/hooks/useChatrooms';
import useAuth from 'shared/hooks/useAuth';
import { useTheme } from '@react-navigation/native';
import useCreateChatroom from 'shared/hooks/useCreateChatroom';
import makeStyles from '../../hooks/makeStyles';
import UsersList from '../../components/UsersList';

const UsersListPage = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const user = useAuth();
  const chatrooms = useChatrooms();
  const createChatroom = useCreateChatroom();

  const onSelectUser = useCallback(
    (userId) => async () => {
      const chatroom = await createChatroom(userId);
      navigation.navigate('Chat', { chatroomId: chatroom.id });
    },
    [createChatroom, navigation],
  );

  return (
    <>
      <Header
        placement="left"
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        centerComponent={{ text: 'Users', style: styles.centerComponent }}
      />
      <UsersList
        onSelectUser={onSelectUser}
        filterPredicate={usersImNotChattingWith(user, chatrooms)}
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

UsersListPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default UsersListPage;

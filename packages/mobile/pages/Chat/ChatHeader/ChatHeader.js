import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Header, Overlay, Text } from 'react-native-elements';
import usePopup from 'shared/hooks/usePopup';
import usersOutsideChatroom from 'shared/helpers/usersOutsideChatroom';
import makeStyles from '../../../hooks/makeStyles';
import UsersList from '../../../components/UsersList';
import SingleUserChatHeader from './SingleUserChatHeader';
import GroupChatHeader from './GroupChatHeader';

const ChatHeader = ({ chatroom, onGoBack, onAddToChatroom }) => {
  const theme = useTheme();
  const styles = useStyles();
  const [popupVisible, showPopup, hidePopup] = usePopup();

  const onSelectUser = useCallback(
    (userId) => async () => {
      hidePopup();
      await onAddToChatroom(userId);
    },
    [hidePopup, onAddToChatroom],
  );

  return (
    <>
      <Overlay
        isVisible={popupVisible}
        overlayStyle={styles.usersListOverlay}
        fullScreen>
        <Header
          placement="left"
          backgroundColor={theme.colors.background}
          leftComponent={{
            icon: 'close',
            style: styles.btn,
            onPress: hidePopup,
          }}
          centerComponent={<Text h4>Users</Text>}
        />
        <UsersList
          contentContainerStyle={styles.usersListContentContainer}
          onSelectUser={onSelectUser}
          filterPredicate={usersOutsideChatroom(chatroom)}
        />
      </Overlay>
      <Header
        placement="left"
        backgroundColor={theme.colors.background}
        leftComponent={{
          icon: 'chevron-left',
          style: styles.btn,
          onPress: onGoBack,
        }}
        centerComponent={
          chatroom.isGroup ? (
            <GroupChatHeader chatroom={chatroom} />
          ) : (
            <SingleUserChatHeader chatroom={chatroom} />
          )
        }
        rightComponent={{
          icon: 'group-add',
          style: styles.btn,
          onPress: showPopup,
        }}
      />
    </>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    usersListOverlay: {
      backgroundColor: theme.colors.background,
    },
    usersListContentContainer: {
      paddingBottom: safeAreaInsets.bottom,
    },
    btn: {
      padding: 4,
    },
  }),
);

ChatHeader.propTypes = {
  chatroom: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
        email: PropTypes.string,
      }),
    ),
    isGroup: PropTypes.bool.isRequired,
    lastActivity: PropTypes.any,
  }),
  onGoBack: PropTypes.func,
  onAddToChatroom: PropTypes.func,
};

export default ChatHeader;

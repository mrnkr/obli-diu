import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import makeStyles from '../../../hooks/makeStyles';
import SingleUserChatHeader from './SingleUserChatHeader';
import GroupChatHeader from './GroupChatHeader';

const ChatHeader = ({ chatroom, onGoBack, onAddToChatroom }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
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
      rightComponent={
        chatroom.isGroup
          ? { icon: 'group-add', style: styles.btn, onPress: onAddToChatroom }
          : undefined
      }
    />
  );
};

const useStyles = makeStyles((theme) =>
  StyleSheet.create({
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

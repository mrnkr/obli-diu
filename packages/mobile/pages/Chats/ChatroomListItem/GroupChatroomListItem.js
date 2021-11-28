import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ListItem, Avatar } from 'react-native-elements';
import useGroupChatroomDisplay from 'shared/hooks/useGroupChatroomDisplay';
import makeStyles from '../../../hooks/makeStyles';

const GroupChatroomListItem = ({ chatroom }) => {
  const theme = useTheme();
  const styles = useStyles();
  const { groupName, lastMessage } = useGroupChatroomDisplay(chatroom);

  return (
    <>
      <Avatar icon={{ name: 'group', color: theme.colors.text }} rounded />
      <ListItem.Content style={styles.content}>
        <ListItem.Title>{groupName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">
          {lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

const useStyles = makeStyles(() =>
  StyleSheet.create({
    content: {
      marginLeft: 8,
    },
  }),
);

GroupChatroomListItem.propTypes = {
  chatroom: PropTypes.shape({
    id: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
        email: PropTypes.string,
      }),
    ),
    lastMessage: PropTypes.shape({
      id: PropTypes.string,
      body: PropTypes.string,
      sender: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  }).isRequired,
};

export default GroupChatroomListItem;

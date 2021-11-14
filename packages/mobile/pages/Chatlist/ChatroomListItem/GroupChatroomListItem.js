import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import useGroupChatroomDisplay from 'shared/hooks/useGroupChatroomDisplay';
import makeStyles from '../../../hooks/makeStyles';

const GroupChatroomListItem = ({ chatroom }) => {
  const styles = useStyles();
  const { groupName, lastMessage } = useGroupChatroomDisplay(chatroom);

  return (
    <>
      <Avatar icon={{ name: 'group' }} rounded />
      <ListItem.Content style={styles.content}>
        <ListItem.Title>{groupName}</ListItem.Title>
        <ListItem.Subtitle>{lastMessage}</ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

const useStyles = makeStyles((theme) =>
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

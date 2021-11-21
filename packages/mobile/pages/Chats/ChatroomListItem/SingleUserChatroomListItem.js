import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import gravatar from 'shared/helpers/gravatar';
import useSingleUserChatroomDisplay from 'shared/hooks/useSingleUserChatroomDisplay';
import makeStyles from '../../../hooks/makeStyles';

const SingleUserChatroomListItem = ({ chatroom }) => {
  const styles = useStyles();
  const { otherUser, userName, lastMessage } =
    useSingleUserChatroomDisplay(chatroom);

  return (
    <>
      <Avatar title={userName} source={{ uri: gravatar(otherUser) }} rounded />
      <ListItem.Content style={styles.content}>
        <ListItem.Title>{userName}</ListItem.Title>
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

SingleUserChatroomListItem.propTypes = {
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

export default SingleUserChatroomListItem;

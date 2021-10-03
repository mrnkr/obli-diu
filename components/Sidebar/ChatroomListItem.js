import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ChatroomListItem = ({ chatroom, user }) => {
  const userName = useMemo(() => chatroom.id, [chatroom]);

  // const lastMessage = useMemo(
  //   () =>
  //     chatroom.lastMessage.createdAt
  //       ? `${chatroom.lastMessage.senderId === user.uid ? '' : '> '}${
  //           chatroom.lastMessage.body
  //         } - ${formatDistance(chatroom.lastMessage.createdAt, new Date(), {
  //           addSuffix: true,
  //         })}`
  //       : '',
  //   [chatroom, user],
  // );

  return (
    <ListItem button key={chatroom.id}>
      <ListItemIcon>
        <Avatar alt={userName} />
      </ListItemIcon>
      <ListItemText primary={userName} />
    </ListItem>
  );
};

ChatroomListItem.propTypes = {
  chatroom: PropTypes.shape({
    id: PropTypes.string,
    otherUser: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
      email: PropTypes.string,
      photoURL: PropTypes.string,
    }),
    lastMessage: PropTypes.shape({
      senderId: PropTypes.string,
      body: PropTypes.string,
      createdAt: PropTypes.instanceOf(Date),
    }),
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

export default ChatroomListItem;

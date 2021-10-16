import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
import md5 from 'md5';
import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ChatroomListItem = ({ chatroom, user }) => {
  const otherUser = useMemo(
    () => chatroom.users.find((u) => u.id !== user?.id),
    [chatroom, user],
  );

  const userName = useMemo(
    () => otherUser.displayName ?? otherUser.email,
    [otherUser],
  );

  const status = useMemo(
    () => (chatroom?.status?.[otherUser?.id] === 'Writing' ? 'typing...' : ''),
    [chatroom, otherUser],
  );

  const lastMessage = useMemo(
    () =>
      !isEmpty(status)
        ? status
        : chatroom.lastMessage?.createdAt
        ? `${chatroom.lastMessage.sender === user?.id ? '' : '> '}${
            chatroom.lastMessage.body
          } - ${formatDistance(
            new Date(chatroom.lastMessage.createdAt),
            new Date(),
            {
              addSuffix: true,
            },
          )}`
        : '',
    [chatroom, status, user],
  );

  return (
    <Link href={`/chatrooms/${chatroom.id}`} passHref>
      <ListItem button key={chatroom.id}>
        <ListItemIcon>
          <Avatar
            alt={userName}
            src={`https://www.gravatar.com/avatar/${md5(
              otherUser?.email ?? '',
            )}`}
          />
        </ListItemIcon>
        <ListItemText primary={userName} secondary={lastMessage} />
      </ListItem>
    </Link>
  );
};

ChatroomListItem.propTypes = {
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
    status: PropTypes.any,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ChatroomListItem;

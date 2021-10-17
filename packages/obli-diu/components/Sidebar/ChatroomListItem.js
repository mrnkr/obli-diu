import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
import md5 from 'md5';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';

const ChatroomListItem = ({ chatroom, user }) => {
  const classes = useStyles();

  const otherUser = useMemo(
    () => chatroom.users.find((u) => u.id !== user?.id),
    [chatroom, user],
  );

  const userName = useMemo(
    () => otherUser.displayName ?? otherUser.email,
    [otherUser],
  );

  const lastMessage = useMemo(
    () =>
      chatroom.lastMessage?.createdAt
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
    [chatroom, user],
  );

  return (
    <Link href={`/chatrooms/${chatroom.id}`} passHref>
      <div>
        <ListItem button key={chatroom.id}>
          <ListItemIcon>
            <Avatar
              alt={userName}
              src={`https://www.gravatar.com/avatar/${md5(
                otherUser?.email ?? '',
              )}`}
            />
          </ListItemIcon>
          <ListItemText
            primary={userName}
            secondary={lastMessage}
            className={classes.listItemText}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    </Link>
  );
};

const useStyles = makeStyles({
  listItemText: {
    '& > p': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
});

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

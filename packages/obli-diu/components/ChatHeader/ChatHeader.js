import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useUserStatus from '../../hooks/useUserStatus';

const ChatHeader = ({ chatroom, user }) => {
  const otherUser = useMemo(
    () => chatroom?.users.find((u) => u.id !== user?.id),
    [chatroom, user],
  );

  const { data: status } = useUserStatus(chatroom, otherUser?.id);

  const userName = useMemo(
    () => otherUser?.displayName ?? otherUser?.email,
    [otherUser],
  );

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Avatar
            alt={userName}
            src={`https://www.gravatar.com/avatar/${md5(
              otherUser?.email ?? '',
            )}`}
          />
        </ListItemIcon>
        <ListItemText primary={userName} secondary={status}></ListItemText>
      </ListItem>
      <Divider />
    </>
  );
};

ChatHeader.propTypes = {
  chatroom: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
        email: PropTypes.string,
      }),
    ),
    lastActivity: PropTypes.any,
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ChatHeader;
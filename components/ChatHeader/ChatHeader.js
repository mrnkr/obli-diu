import React, { useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import md5 from 'md5';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import Link from 'next/link';
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

  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.chatHeader}>
        <ListItemIcon>
          <Link href="/home" passHref>
            <IconButton
              aria-label="back"
              color="primary"
              className={classes.routerBack}>
              <ArrowBack />
            </IconButton>
          </Link>
          <Avatar
            className={classes.avatar}
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

const useStyles = makeStyles((theme) => ({
  borderRight500: {
    borderRight: '0px solid #e0e0e0',
  },
  chatHeader: {
    padding: 8,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  [theme.breakpoints.up('md')]: {
    borderRight500: {
      borderRight: '1px solid #e0e0e0',
    },
    routerBack: {
      display: 'none',
    },
  },
}));

export default ChatHeader;

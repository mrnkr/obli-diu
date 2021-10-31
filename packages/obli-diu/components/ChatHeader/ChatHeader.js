import React, { useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import ListSubheader from '@material-ui/core/ListSubheader';
import useUserStatus from 'shared/hooks/useUserStatus';
import gravatar from 'shared/helpers/gravatar';

const ChatHeader = ({ chatroom, user }) => {
  const classes = useStyles();

  const otherUser = useMemo(
    () => chatroom?.users.find((u) => u.id !== user?.id),
    [chatroom, user],
  );

  const status = useUserStatus(chatroom, otherUser?.id);

  const userName = useMemo(
    () => otherUser?.displayName ?? otherUser?.email,
    [otherUser],
  );

  return (
    <ListSubheader className={classes.listSubheader}>
      <ListItem className={classes.chatHeader}>
        <ListItemIcon>
          <Link href="/home" passHref>
            <IconButton
              aria-label="back"
              color="default"
              className={classes.routerBack}>
              <ArrowBack />
            </IconButton>
          </Link>
          <Avatar
            className={classes.avatar}
            alt={userName}
            src={gravatar(otherUser)}
          />
        </ListItemIcon>
        <ListItemText
          primary={userName}
          secondary={status}
          className={classes.userName}></ListItemText>
      </ListItem>
      <Divider />
    </ListSubheader>
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
  listSubheader: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
  borderRight500: {
    borderRight: '0px solid #e0e0e0',
  },
  chatHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 8,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  userName: {
    marginLeft: 8,
  },
  [theme.breakpoints.up('md')]: {
    chatHeader: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 16,
      paddingLeft: 16,
    },
    borderRight500: {
      borderRight: '1px solid #e0e0e0',
    },
    routerBack: {
      display: 'none',
    },
    userName: {
      marginLeft: 0,
    },
  },
}));

export default ChatHeader;

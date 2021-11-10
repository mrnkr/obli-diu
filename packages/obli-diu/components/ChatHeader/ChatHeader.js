import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Link from 'next/link';
import usersOutsideChatroom from 'shared/helpers/usersOutsideChatroom';
import usePopup from 'shared/hooks/usePopup';
import UserListPopup from '../UserListPopup/UserListPopup';
import GroupChatHeader from './GroupChatHeader';
import SingleUserChatHeader from './SingleUserChatHeader';

const ChatHeader = ({ chatroom, onUserAddedToChatroom }) => {
  const classes = useStyles();
  const [userListPopupVisible, showUserListPopup, closeUserListPopup] =
    usePopup();

  return (
    <>
      <UserListPopup
        open={userListPopupVisible}
        handleClose={closeUserListPopup}
        onSelectUser={onUserAddedToChatroom}
        filterPredicate={usersOutsideChatroom(chatroom)}
      />
      <ListSubheader className={classes.listSubheader}>
        <ListItem className={classes.chatHeader}>
          <ListItemIcon className={classes.routerBack}>
            <Link href="/home" passHref>
              <IconButton aria-label="back" color="default">
                <ArrowBack />
              </IconButton>
            </Link>
          </ListItemIcon>
          {chatroom.isGroup ? (
            <GroupChatHeader chatroom={chatroom} />
          ) : (
            <SingleUserChatHeader chatroom={chatroom} />
          )}
          <ListItemIcon>
            <Tooltip
              title="Add a person to this conversation"
              aria-label="add-to-group">
              <IconButton onClick={showUserListPopup}>
                <GroupAdd />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        </ListItem>
        <Divider />
      </ListSubheader>
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
    isGroup: PropTypes.bool.isRequired,
    lastActivity: PropTypes.any,
  }),
  onUserAddedToChatroom: PropTypes.func.isRequired,
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
  },
}));

export default ChatHeader;

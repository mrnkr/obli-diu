import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import gravatar from 'shared/helpers/gravatar';
import useUserStatus from 'shared/hooks/useUserStatus';
import useSingleUserChatroomDisplay from 'shared/hooks/useSingleUserChatroomDisplay';

const SingleUserChatHeader = ({ chatroom }) => {
  const classes = useStyles();
  const { otherUser, userName } = useSingleUserChatroomDisplay(chatroom);
  const status = useUserStatus(chatroom, otherUser?.id);

  return (
    <>
      <ListItemIcon>
        <Avatar alt={userName} src={gravatar(otherUser)} />
      </ListItemIcon>
      <ListItemText
        primary={userName}
        secondary={status}
        className={classes.userName}
      />
    </>
  );
};

SingleUserChatHeader.propTypes = {
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
  onUserAddedToChatroom: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 48,
    height: 48,
  },
  userName: {
    marginLeft: 8,
  },
  [theme.breakpoints.up('md')]: {
    userName: {
      marginLeft: 0,
    },
  },
}));

export default SingleUserChatHeader;

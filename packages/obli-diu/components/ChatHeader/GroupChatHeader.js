import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import useGroupChatroomDisplay from 'shared/hooks/useGroupChatroomDisplay';

const GroupChatHeader = ({ chatroom }) => {
  const classes = useStyles();
  const { groupName } = useGroupChatroomDisplay(chatroom);

  return (
    <>
      <ListItemIcon>
        <Avatar className={classes.avatar} alt={groupName}>
          <GroupIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText primary={groupName} className={classes.userName} />
    </>
  );
};

GroupChatHeader.propTypes = {
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

export default GroupChatHeader;

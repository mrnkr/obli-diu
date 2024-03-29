import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import GroupIcon from '@material-ui/icons/Group';
import useGroupChatroomDisplay from 'shared/hooks/useGroupChatroomDisplay';

const GroupChatroomListItem = ({ chatroom }) => {
  const classes = useStyles();
  const { groupName, lastMessage } = useGroupChatroomDisplay(chatroom);

  return (
    <>
      <ListItemIcon>
        <Avatar alt={groupName}>
          <GroupIcon />
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={groupName}
        secondary={lastMessage}
        className={classes.listItemText}
      />
      <Divider variant="inset" component="li" />
    </>
  );
};

const useStyles = makeStyles({
  listItemText: {
    '& > p': {
      display: '-webkit-box',
      lineClamp: 2,
      boxOrient: 'vertical',
      overflow: 'hidden',
    },
  },
});

GroupChatroomListItem.propTypes = {
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

export default GroupChatroomListItem;

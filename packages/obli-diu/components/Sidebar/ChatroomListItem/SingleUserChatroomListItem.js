import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import gravatar from 'shared/helpers/gravatar';
import useSingleUserChatroomDisplay from 'shared/hooks/useSingleUserChatroomDisplay';

const SingleUserChatroomListItem = ({ chatroom }) => {
  const classes = useStyles();
  const { otherUser, userName, lastMessage } =
    useSingleUserChatroomDisplay(chatroom);

  return (
    <>
      <ListItemIcon>
        <Avatar alt={userName} src={gravatar(otherUser)} />
      </ListItemIcon>
      <ListItemText
        primary={userName}
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
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
});

SingleUserChatroomListItem.propTypes = {
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

export default SingleUserChatroomListItem;

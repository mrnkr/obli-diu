import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import blue from '@material-ui/core/colors/blue';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import useUsers from 'shared/hooks/useUsers';
import gravatar from 'shared/helpers/gravatar';

const UserListPopup = ({ open, handleClose }) => {
  const classes = useStyles();
  const { data: users, createChatroom } = useUsers();

  const onListItemClick = useCallback(
    (userId) => async () => {
      handleClose();
      await createChatroom(userId);
    },
    [createChatroom, handleClose],
  );

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">Users</DialogTitle>
      <List>
        {!users?.length ? (
          <ListItem>
            <Typography>No users</Typography>
          </ListItem>
        ) : null}
        {users?.map((user) => (
          <ListItem button key={user.id} onClick={onListItemClick(user.id)}>
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt={user.displayName ?? user.email}
                src={gravatar(user)}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.name}
              primary={user.displayName ?? user.email}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  name: {
    marginRight: '8px',
  },
});

UserListPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default UserListPopup;

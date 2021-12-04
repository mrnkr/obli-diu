import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useUsers from 'shared/hooks/useUsers';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import PersonIcon from '@material-ui/icons/Person';
import gravatar from 'shared/helpers/gravatar';

const RankingListPopup = ({ open, handleClose, filterPredicate }) => {
  const classes = useStyles();
  const users = useUsers(filterPredicate);

  const data = useMemo(() => users.slice(0, 5), [users]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">Ranking</DialogTitle>
      <List>
        {!users?.length ? (
          <ListItem>
            <Typography>No users</Typography>
          </ListItem>
        ) : null}
        {data.map((user, index) => (
          <ListItem key={user.id}>
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
            <Rating name="read-only" value={5 - index} readOnly />
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

RankingListPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  filterPredicate: PropTypes.func.isRequired,
};

export default RankingListPopup;

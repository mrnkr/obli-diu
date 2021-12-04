import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Equalizer from '@material-ui/icons/Equalizer';
import Timeline from '@material-ui/icons/Timeline';
import Message from '@material-ui/icons/Message';
import Send from '@material-ui/icons/Send';

const UsagePopup = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">Usage</DialogTitle>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Timeline />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Total Time" secondary="Used for 1 hr, 9 min" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Equalizer />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Average Session Time"
            secondary="Used for 2 min"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Send />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Sent Messages"
            secondary="Total sent messages 16"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Message />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Received Messages"
            secondary="Total received messages 20"
          />
        </ListItem>
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

UsagePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  filterPredicate: PropTypes.func.isRequired,
};

export default UsagePopup;

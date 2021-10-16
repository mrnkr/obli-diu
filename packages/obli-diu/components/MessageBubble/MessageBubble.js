import React from 'react';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';

const MessageBubble = ({ message, user }) => {
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText
            align={user?.id === message.sender ? 'left' : 'right'}
            primary={message.body}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            align={user?.id === message.sender ? 'left' : 'right'}
            secondary={formatDistance(new Date(message.createdAt), new Date(), {
              addSuffix: true,
            })}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    sender: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default MessageBubble;

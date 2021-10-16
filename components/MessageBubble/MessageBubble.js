import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import formatDistance from 'date-fns/formatDistance';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';

const MessageBubble = ({ message, user }) => {
  const classes = useStyles();

  return (
    <ListItem>
      <Grid
        xs={6}
        container
        className={
          user?.id === message.sender
            ? classes.bubbleAreaLeft
            : classes.bubbleAreaRight
        }>
        <Grid item xs={12}>
          <ListItemText
            className={classes.bubbleText}
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

const useStyles = makeStyles({
  bubbleAreaLeft: {
    background: '#008000',
    borderRadius: '15px',
    alignContent: 'left',
    marginLeft: 'auto',
    padding: 8,
    display: 'flex',
  },
  bubbleAreaRight: {
    background: '#0000ff',
    borderRadius: '15px',
    alignContent: 'right',
    padding: 8,
    display: 'flex',
  },
  bubbleText: {
    display: 'flex',
  },
});

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

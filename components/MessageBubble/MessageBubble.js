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
        sm={11}
        md={6}
        container
        className={
          user?.id === message.sender
            ? classes.bubbleAreaLeft
            : classes.bubbleAreaRight
        }>
        <Grid item xs={12}>
          <ListItemText
            className={classes.listItemText}
            align={user?.id === message.sender ? 'left' : 'right'}
            primary={message.body}
            secondary={formatDistance(new Date(message.createdAt), new Date(), {
              addSuffix: true,
            })}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  bubbleAreaLeft: {
    background: theme.palette.primary.main,
    color: theme.palette.text.primary,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    alignContent: 'left',
    marginLeft: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
  },
  bubbleAreaRight: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    alignContent: 'right',
    paddingLeft: 8,
    paddingRight: 8,
  },
  listItemText: {
    '& > span': {
      overflowWrap: 'anywhere',
      textAlign: 'left',
    },
    '& > p': {
      textAlign: 'right',
    },
  },
}));

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

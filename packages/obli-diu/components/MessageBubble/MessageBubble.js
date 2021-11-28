import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import makeStyles from '@material-ui/core/styles/makeStyles';
import formatDistance from 'date-fns/formatDistance';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const URL_REGEX =
  /(((http|https):\/\/)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*))/g;

const MessageBubble = ({ chatroom, message, user }) => {
  const classes = useStyles();

  const currentUserSentMessage = useMemo(
    () => user?.id === message.sender,
    [message, user],
  );

  const body = useMemo(() => {
    const urls = message.body.match(URL_REGEX);
    return (
      <>
        {urls?.map((url, idx) => (
          <LinkPreview className={classes.linkPreview} url={url} key={idx} />
        ))}
        {!currentUserSentMessage && chatroom.isGroup && (
          <b>
            {chatroom.users.find((u) => u.id === message.sender).displayName}
            <br />
          </b>
        )}
        {message.pictureUrl && (
          <Image
            className={classes.imgPreview}
            layout="responsive"
            height={50}
            width={100}
            src={message.pictureUrl}
            alt={message.body}
          />
        )}
        {message.body}
      </>
    );
  }, [chatroom, classes, currentUserSentMessage, message]);

  return (
    <ListItem>
      <Grid
        sm={11}
        md={8}
        container
        className={
          currentUserSentMessage
            ? classes.bubbleAreaLeft
            : classes.bubbleAreaRight
        }>
        <Grid item xs={12}>
          <ListItemText
            className={classes.listItemText}
            align={currentUserSentMessage ? 'left' : 'right'}
            primary={body}
            secondary={formatDistance(new Date(message.createdAt), new Date(), {
              addSuffix: true,
            })}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  linkPreview: {
    marginBottom: 8,
  },
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
  imgPreview: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    objectFit: 'cover',
  },
}));

MessageBubble.propTypes = {
  chatroom: PropTypes.shape({
    id: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
      }),
    ),
    isGroup: PropTypes.bool.isRequired,
  }).isRequired,
  message: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    pictureUrl: PropTypes.string,
    sender: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default memo(MessageBubble);

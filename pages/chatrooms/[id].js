import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import Sidebar from '../../components/Sidebar';
import useAuth from '../../hooks/useAuth';
import useChatroom from '../../hooks/useChatroom';
import MessageBubble from '../../components/MessageBubble';
import Composer from '../../components/Composer';
import ChatHeader from '../../components/ChatHeader';
import withRouterParams from '../../components/withRouterParams/withRouterParams';
import useMountEffect from '../../hooks/useMountEffect';

const Chat = ({ params }) => {
  const classes = useStyles();
  const router = useRouter();
  const user = useAuth();

  useMountEffect(() => {
    if (!user) {
      router.replace('/');
    }
  });

  const {
    data: chatroom,
    sendMessage,
    notifyStartWriting,
  } = useChatroom(params.id);

  return (
    <Grid container component={Paper} className={classes.self}>
      <Sidebar className={classes.sidebar} />
      <Grid item sm={12} md={9} className={classes.messageGrid}>
        <List className={classes.messageArea}>
          {chatroom.id !== 'dummy' && user && (
            <ChatHeader chatroom={chatroom} user={user} />
          )}
          {chatroom.messages.map((message) => (
            <MessageBubble key={message.id} message={message} user={user} />
          ))}
          <div className={classes.filler} />
        </List>
        <Divider />
        <Composer
          onClickSend={sendMessage}
          onStartWriting={notifyStartWriting}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  self: {
    height: '100vh',
  },
  sidebar: {
    display: 'none',
  },
  messageArea: {
    padding: 0,
    width: '100%',
    overflowY: 'auto',
    flex: 1,
  },
  messageGrid: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  filler: {
    flexGrow: 1,
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    sidebar: {
      display: 'flex',
    },
    messageGrid: {
      width: 'unset',
    },
  },
}));

Chat.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default withRouterParams(Chat);

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import useAuth from 'shared/hooks/useAuth';
import useChatroom from 'shared/hooks/useChatroom';
import useGuard from 'shared/hooks/useGuard';

import Sidebar from '../../components/Sidebar';
import MessageBubble from '../../components/MessageBubble';
import Composer from '../../components/Composer';
import ChatHeader from '../../components/ChatHeader';
import withRouterParams from '../../components/withRouterParams';

const Chat = ({ params }) => {
  const classes = useStyles();
  const router = useRouter();
  const user = useAuth();

  useGuard((userInfo) => {
    if (!userInfo.id) {
      router.replace('/');
    }
  });

  const {
    data: chatroom,
    sendMessage,
    notifyStartWriting,
    addPersonToChatroom,
  } = useChatroom(params.id);

  const [firstRender, setFirstRender] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatroom.messages.length) {
      return;
    }

    if (firstRender) {
      messagesEndRef.current.scrollIntoView();
      setFirstRender(false);
    } else {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [firstRender, chatroom]);

  return (
    <Grid container component={Paper} className={classes.self}>
      <Sidebar className={classes.sidebar} />
      <Grid item sm={12} md={9} className={classes.messageGrid}>
        <List className={classes.messageArea}>
          {chatroom.id !== 'dummy' && user && (
            <ChatHeader
              chatroom={chatroom}
              user={user}
              onUserAddedToChatroom={addPersonToChatroom}
            />
          )}
          {chatroom.messages.map((message) => (
            <MessageBubble
              key={message.id}
              chatroom={chatroom}
              message={message}
              user={user}
            />
          ))}
          <div ref={messagesEndRef} />
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

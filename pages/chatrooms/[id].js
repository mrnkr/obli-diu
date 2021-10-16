import React from 'react';
import PropTypes from 'prop-types';
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

const Chat = ({ params }) => {
  const user = useAuth();
  const classes = useStyles();
  const {
    data: chatroom,
    sendMessage,
    notifyStartWriting,
  } = useChatroom(params.id);

  return (
    <Grid container component={Paper} className={classes.chatSection}>
      <Sidebar className={classes.sidebar} />
      <Grid item sm={12} md={9}>
        <List className={classes.messageArea}>
          {chatroom.id !== 'dummy' && user && (
            <ChatHeader chatroom={chatroom} user={user} />
          )}
          {chatroom.messages.map((message) => (
            <MessageBubble key={message.id} message={message} user={user} />
          ))}
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
  sidebar: {
    display: 'none',
  },
  chatSection: {
    width: '100%',
    height: '100vh',
  },
  messageArea: {
    padding: 0,
    height: '88vh',
    width: '100%',
    overflowY: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    sidebar: {
      display: 'block',
    },
  },
}));

Chat.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default withRouterParams(Chat);

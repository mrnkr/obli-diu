import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import useChatroom from '../../shared/hooks/useChatroom';

const Chat = ({ route }) => {
  const { chatroomId } = route.params;
  const {
    data: chatroom,
    sendMessage,
    notifyStartWriting,
    addPersonToChatroom,
  } = useChatroom(chatroomId);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      showAvatarForEveryMessage
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

Chat.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      chatroomId: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Chat;

import React, { useCallback, useMemo } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import useChatroom from 'shared/hooks/useChatroom';
import useAuth from 'shared/hooks/useAuth';
import gravatar from 'shared/helpers/gravatar';
import ChatHeader from './ChatHeader';
import ComposerActions from './ComposerActions';

const Chat = ({ route, navigation }) => {
  const { chatroomId } = route.params;
  const currentUser = useAuth();
  const {
    data: chatroom,
    sendMessage,
    notifyStartWriting,
    addPersonToChatroom,
  } = useChatroom(chatroomId);

  const messages = useMemo(() => {
    const users = new Map(
      chatroom?.users?.map((user) => [user.id, user]) ?? [],
    );
    return (
      chatroom?.messages
        ?.map((message) => ({
          _id: message.id,
          text: message.body,
          user: {
            _id: message.sender,
            name: users.get(message.sender).displayName,
            avatar: gravatar(users.get(message.sender)),
          },
          createdAt: new Date(message.createdAt),
        }))
        ?.reverse() ?? []
    );
  }, [chatroom]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSend = useCallback(
    async ([{ text }]) => {
      await sendMessage(text);
    },
    [sendMessage],
  );

  const renderActions = useCallback(() => {
    return (
      <ComposerActions onPress={() => navigation.navigate('CameraView')} />
    );
  }, [navigation]);

  return (
    <>
      {chatroom.id !== 'dummy' ? (
        <ChatHeader
          chatroom={chatroom}
          onAddToChatroom={addPersonToChatroom}
          onGoBack={goBack}
        />
      ) : null}
      <GiftedChat
        renderUsernameOnMessage={chatroom.isGroup}
        messages={messages}
        onInputTextChanged={notifyStartWriting}
        onSend={onSend}
        renderActions={renderActions}
        user={{
          _id: currentUser.id,
        }}
      />
    </>
  );
};

Chat.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      chatroomId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default Chat;

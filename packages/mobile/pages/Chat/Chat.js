import React, { useCallback, useMemo } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import useChatroom from 'shared/hooks/useChatroom';
import useAuth from 'shared/hooks/useAuth';
import gravatar from 'shared/helpers/gravatar';
import usePopup from 'shared/hooks/usePopup';
import useImageUpload from '../../hooks/useImageUpload';
import ChatHeader from './ChatHeader';
import ComposerActions from './ComposerActions';
import CameraViewModal from './CameraViewModal';
import ImagePreviewModal from './ImagePreviewModal';

const Chat = ({ route, navigation }) => {
  const { chatroomId } = route.params;
  const currentUser = useAuth();
  const [uploadImage, { publicId, uploading }] = useImageUpload();
  const [cameraViewVisible, showCameraView, hideCameraView] = usePopup();
  const [imagePreviewVisible, showImagePreview, hideImagePreview] = usePopup();

  const {
    data: chatroom,
    sendMessage,
    sendPicture,
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
          image: message.pictureUrl,
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

  const onPictureTaken = useCallback(
    async (dataUri) => {
      await uploadImage(dataUri);
      hideCameraView();
      showImagePreview();
    },
    [hideCameraView, showImagePreview, uploadImage],
  );

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSend = useCallback(
    async ([{ text }]) => {
      await sendMessage(text);
    },
    [sendMessage],
  );

  const onSendPicture = useCallback(
    async (pictureUrl) => {
      await sendPicture(pictureUrl);
      hideImagePreview();
    },
    [hideImagePreview, sendPicture],
  );

  const renderActions = useCallback(() => {
    return <ComposerActions onPress={showCameraView} />;
  }, [showCameraView]);

  return (
    <>
      <CameraViewModal
        visible={cameraViewVisible}
        uploading={uploading}
        onPictureTaken={onPictureTaken}
        onRequestClose={hideCameraView}
      />
      <ImagePreviewModal
        visible={imagePreviewVisible}
        image={publicId}
        onSendPicture={onSendPicture}
        onRequestClose={hideImagePreview}
      />
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

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import GroupChatroomListItem from './GroupChatroomListItem';
import SingleUserChatroomListItem from './SingleUserChatroomListItem';

const ChatroomListItem = ({ navigation, chatroom }) => {
  const goToChatroom = () => {
    navigation.navigate('Chat');
  };

  return (
    <TouchableOpacity onPress={goToChatroom}>
      <ListItem topDivider>
        {chatroom.isGroup ? (
          <GroupChatroomListItem chatroom={chatroom} />
        ) : (
          <SingleUserChatroomListItem chatroom={chatroom} />
        )}
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
};

ChatroomListItem.propTypes = {
  chatroom: PropTypes.shape({
    id: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
        email: PropTypes.string,
      }),
    ),
    lastMessage: PropTypes.shape({
      id: PropTypes.string,
      body: PropTypes.string,
      sender: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
    isGroup: PropTypes.bool.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default memo(ChatroomListItem);

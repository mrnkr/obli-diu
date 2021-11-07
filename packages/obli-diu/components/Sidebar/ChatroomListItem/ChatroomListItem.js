import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import ListItem from '@material-ui/core/ListItem';
import GroupChatroomListItem from './GroupChatroomListItem';
import SingleUserChatroomListItem from './SingleUserChatroomListItem';

const ChatroomListItem = ({ chatroom }) => {
  const router = useRouter();

  const goToChatroom = useCallback(async () => {
    if (router.query?.id === chatroom.id) {
      return;
    }

    await router.push(`/chatrooms/${chatroom.id}`);
  }, [chatroom, router]);

  return (
    <ListItem button key={chatroom.id} onClick={goToChatroom}>
      {chatroom.isGroup ? (
        <GroupChatroomListItem chatroom={chatroom} />
      ) : (
        <SingleUserChatroomListItem chatroom={chatroom} />
      )}
    </ListItem>
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
};

export default memo(ChatroomListItem);

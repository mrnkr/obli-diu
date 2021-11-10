import { useMemo } from 'react';
import formatDistance from 'date-fns/formatDistance';
import useAuth from './useAuth';

const useChatroomDisplay = (chatroom) => {
  const user = useAuth();

  const otherUser = useMemo(
    () => chatroom.users.find((u) => u.id !== user?.id),
    [chatroom, user],
  );

  const userName = useMemo(
    () => otherUser.displayName ?? otherUser.email,
    [otherUser],
  );

  const lastMessage = useMemo(
    () =>
      chatroom.lastMessage?.createdAt
        ? `${chatroom.lastMessage.sender === user?.id ? '' : '> '}${
            chatroom.lastMessage.body
          } - ${formatDistance(
            new Date(chatroom.lastMessage.createdAt),
            new Date(),
            {
              addSuffix: true,
            },
          )}`
        : '',
    [chatroom, user],
  );

  return {
    otherUser,
    userName,
    lastMessage,
  };
};

export default useChatroomDisplay;

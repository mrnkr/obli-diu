import { useMemo } from 'react';
import formatDistance from 'date-fns/formatDistance';
import useAuth from './useAuth';

const useGroupChatroomDisplay = (chatroom) => {
  const user = useAuth();

  const otherUsers = useMemo(
    () => chatroom.users.filter((u) => u.id !== user.id),
    [chatroom, user],
  );

  const groupName = useMemo(
    () => otherUsers.map((u) => u.displayName).join(', '),
    [otherUsers],
  );

  const lastMessage = useMemo(() => {
    const lastMessageSender = otherUsers.find(
      (u) => u.id === chatroom.lastMessage.sender,
    );
    return chatroom.lastMessage?.createdAt
      ? `${
          chatroom.lastMessage.sender === user?.id
            ? ''
            : `${lastMessageSender.displayName}: `
        }${chatroom.lastMessage.body} - ${formatDistance(
          new Date(chatroom.lastMessage.createdAt),
          new Date(),
          {
            addSuffix: true,
          },
        )}`
      : '';
  }, [chatroom, otherUsers, user]);

  return {
    groupName,
    lastMessage,
  };
};

export default useGroupChatroomDisplay;

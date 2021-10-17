import { gql, useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import add from 'date-fns/add';
import isAfter from 'date-fns/isAfter';
import formatDistance from 'date-fns/formatDistance';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import useErrorNotifier from './useErrorNotifier';
import useInterval from './useInterval';
import useLoadingNotifier from './useLoadingNotifier';

const FETCH_ONCE = gql`
  query GetUserById($userId: String!) {
    user(id: $userId) {
      id
      lastHeartbeatAt
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription UserStatusUpdated($userId: String!) {
    userStatusUpdated(id: $userId) {
      id
      lastHeartbeatAt
    }
  }
`;

const useUserStatus = (chatroom, userId) => {
  const [onlineStatusObsolete, setOnlineStatusObsolete] = useState(0);
  const [writingStatusObsolete, setWritingStatusObsolete] = useState(0);

  const { loading, data, error, subscribeToMore } = useQuery(FETCH_ONCE, {
    variables: {
      userId,
    },
  });

  useLoadingNotifier(loading);
  useErrorNotifier(error);

  useInterval(() => setOnlineStatusObsolete((value) => value + 1), 30000);
  useInterval(() => setWritingStatusObsolete((value) => value + 1), 5000);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUBSCRIPTION,
      variables: {
        userId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          ...prev,
          user: subscriptionData.data.userStatusUpdated,
        };
      },
    });

    return unsubscribe;
  }, [subscribeToMore, userId]);

  const onlineStatus = useMemo(() => {
    const user = data?.user;

    if (!user || !user?.lastHeartbeatAt) {
      return '';
    }

    const lastHeartbeatAt = new Date(user.lastHeartbeatAt);
    const now = new Date();

    if (isAfter(add(lastHeartbeatAt, { seconds: 30 }), now)) {
      return 'Online';
    }

    return `Last seen ${formatDistance(lastHeartbeatAt, now, {
      addSuffix: true,
    })}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, onlineStatusObsolete]);

  const isWriting = useMemo(() => {
    if (!chatroom.lastActivity?.[userId]) {
      return false;
    }

    const now = new Date();
    const lastActivityAt = new Date(chatroom.lastActivity[userId]);
    const lastMessage = chatroom.lastMessage;

    if (lastMessage.sender === userId) {
      const lastMessageSentAt = new Date(lastMessage.createdAt);
      const diff = differenceInSeconds(lastMessageSentAt, lastActivityAt);
      if (diff < 5 && diff > 0) {
        return false;
      }
    }

    return isAfter(add(lastActivityAt, { seconds: 5 }), now);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroom, userId, writingStatusObsolete]);

  const status = useMemo(
    () => (isWriting ? 'typing...' : onlineStatus),
    [isWriting, onlineStatus],
  );

  return { data: status };
};

export default useUserStatus;

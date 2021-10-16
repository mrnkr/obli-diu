import { gql, useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import useGqlError from './useGqlError';

const FETCH_ONCE = gql`
  query GetChatroomById($chatroomId: String!) {
    chatroom(id: $chatroomId) {
      id
      messages {
        id
        body
        sender
        createdAt
        updatedAt
      }
      users {
        id
        displayName
        email
      }
      status
      createdAt
      updatedAt
    }
  }
`;

const CHATROOM_SUBSCRIPTION = gql`
  subscription ChatroomUpdates {
    chatroomUpdated {
      id
      status
      createdAt
      updatedAt
    }
  }
`;

const MSG_SUBSCRIPTION = gql`
  subscription NewMessage($chatroomId: String!) {
    messageReceived(id: $chatroomId) {
      id
      body
      sender
      createdAt
      updatedAt
    }
  }
`;

const STATUS_UPDATE_MUTATION = gql`
  mutation UpdateStatus($input: SetStatusForUserDto!) {
    setStatusForUser(input: $input) {
      id
      status
    }
  }
`;

const SEND_MSG_MUTATION = gql`
  mutation SendMessage($input: SendMessageDto!) {
    sendMessage(input: $input) {
      id
      body
      sender
      createdAt
      updatedAt
    }
  }
`;

const defaultChatroom = {
  id: 'dummy',
  users: [],
  messages: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const useChatroom = (chatroomId) => {
  const {
    loading,
    data,
    error: gqlError,
    subscribeToMore,
  } = useQuery(FETCH_ONCE, {
    variables: {
      chatroomId,
    },
  });
  const [error, clearError] = useGqlError(gqlError);

  const [statusUpdateMutation] = useMutation(STATUS_UPDATE_MUTATION);
  const [sendMsgMutation] = useMutation(SEND_MSG_MUTATION);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CHATROOM_SUBSCRIPTION,
      variables: {
        chatroomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedChatroom = subscriptionData.data.chatroomUpdated;

        return {
          ...prev,
          chatroom: {
            ...prev.chatroom,
            ...updatedChatroom,
          },
        };
      },
    });

    return unsubscribe;
  }, [chatroomId, subscribeToMore]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MSG_SUBSCRIPTION,
      variables: {
        chatroomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageReceived;

        return {
          ...prev,
          chatroom: {
            ...prev.chatroom,
            messages: [...prev.chatroom.messages, newMessage],
          },
        };
      },
    });

    return unsubscribe;
  }, [chatroomId, subscribeToMore]);

  const notifyStartWriting = useCallback(async () => {
    await statusUpdateMutation({
      variables: {
        input: {
          chatroomId,
          status: 'Writing',
        },
      },
    });
  }, [chatroomId, statusUpdateMutation]);

  const notifyStopWriting = useCallback(async () => {
    await statusUpdateMutation({
      variables: {
        input: {
          chatroomId,
          status: 'Idle',
        },
      },
    });
  }, [chatroomId, statusUpdateMutation]);

  const sendMessage = useCallback(
    async (messageBody) => {
      await sendMsgMutation({
        variables: {
          input: {
            chatroomId,
            messageBody,
          },
        },
      });
    },
    [chatroomId, sendMsgMutation],
  );

  return {
    loading,
    data: data?.chatroom ?? defaultChatroom,
    error,
    clearError,
    sendMessage,
    notifyStartWriting,
    notifyStopWriting,
  };
};

export default useChatroom;

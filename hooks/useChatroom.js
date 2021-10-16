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
      createdAt
      updatedAt
    }
  }
`;

const SUBSCRIPTION = gql`
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

const MUTATION = gql`
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

  const [mutateFn] = useMutation(MUTATION);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUBSCRIPTION,
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

  const sendMessage = useCallback(
    async (messageBody) => {
      await mutateFn({
        variables: {
          input: {
            chatroomId,
            messageBody,
          },
        },
      });
    },
    [chatroomId, mutateFn],
  );

  return {
    loading,
    data: data?.chatroom ?? defaultChatroom,
    error,
    clearError,
    sendMessage,
  };
};

export default useChatroom;

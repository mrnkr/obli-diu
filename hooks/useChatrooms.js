import { gql, useQuery } from '@apollo/client';
import useGqlError from './useGqlError';
import useMountEffect from './useMountEffect';

const FETCH_ONCE = gql`
  query GetMyChatrooms {
    chatrooms {
      id
      users {
        id
        displayName
        email
      }
      lastMessage {
        id
        body
        sender
        createdAt
        updatedAt
      }
      lastActivity
      createdAt
      updatedAt
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription ChatroomUpdates {
    chatroomUpdated {
      id
      users {
        id
        displayName
        email
      }
      lastMessage {
        id
        body
        sender
        createdAt
        updatedAt
      }
      lastActivity
      createdAt
      updatedAt
    }
  }
`;

const useChatrooms = () => {
  const {
    loading,
    data,
    error: gqlError,
    subscribeToMore,
  } = useQuery(FETCH_ONCE);
  const [error, clearError] = useGqlError(gqlError);

  useMountEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const updatedChatroom = subscriptionData.data.chatroomUpdated;
        const newChatrooms = [...prev.chatrooms];

        const idx = newChatrooms.findIndex(
          (chatroom) => chatroom.id === updatedChatroom.id,
        );

        if (idx >= 0) {
          newChatrooms.splice(idx, 1);
        }

        newChatrooms.unshift(updatedChatroom);

        return {
          ...prev,
          chatrooms: newChatrooms,
        };
      },
    });

    return unsubscribe;
  });

  return { loading, data: data?.chatrooms ?? [], error, clearError };
};

export default useChatrooms;

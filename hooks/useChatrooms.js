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
        createdAt
      }
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
        createdAt
      }
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
    subscribeToMore({
      document: SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const updatedChatroom = subscriptionData.data.chatroomUpdated;
        const newChatrooms = [...prev.chatrooms];
        newChatrooms.splice(
          newChatrooms.findIndex(
            (chatroom) => chatroom.id === updatedChatroom.id,
          ),
          1,
        );
        newChatrooms.unshift(updatedChatroom);

        return Object.assign({}, prev, {
          chatrooms: newChatrooms,
        });
      },
    });
  });

  return { loading, data: data?.chatrooms ?? [], error, clearError };
};

export default useChatrooms;

import { gql, useMutation, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import useAuth from './useAuth';
import useChatrooms from './useChatrooms';
import useErrorNotifier from './useErrorNotifier';
import useLoadingNotifier from './useLoadingNotifier';

const FETCH_ONCE = gql`
  query GetAllUsers {
    users {
      id
      displayName
      email
    }
  }
`;

const MUTATION = gql`
  mutation CreateChatroom($input: CreateChatroomDto!) {
    createChatroom(input: $input) {
      id
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

const useUsers = () => {
  const user = useAuth();
  const chatrooms = useChatrooms();

  const { loading, data, error } = useQuery(FETCH_ONCE);
  useLoadingNotifier(loading);
  useErrorNotifier(error);

  const [mutateFn] = useMutation(MUTATION);

  const users = useMemo(() => {
    // eslint-disable-next-line no-undef
    const usersImChattingWith = new Map(
      chatrooms.map((c) => [c.users.find((u) => u.id !== user?.id)?.id, true]),
    );

    return (
      data?.users.filter(
        (u) => u.id !== user?.id && !usersImChattingWith.has(u.id),
      ) ?? []
    );
  }, [chatrooms, data, user]);

  const createChatroom = useCallback(
    async (userId) => {
      await mutateFn({
        variables: {
          input: {
            userId,
          },
        },
      });
    },
    [mutateFn],
  );

  return { data: users, createChatroom };
};

export default useUsers;

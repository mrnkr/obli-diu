import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

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

const useCreateChatroom = () => {
  const [mutateFn] = useMutation(MUTATION);

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

  return createChatroom;
};

export default useCreateChatroom;

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
      const response = await mutateFn({
        variables: {
          input: {
            userId,
          },
        },
      });

      return response.data.createChatroom;
    },
    [mutateFn],
  );

  return createChatroom;
};

export default useCreateChatroom;

import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import useGqlError from './useGqlError';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserDto!) {
    createUser(input: $input)
  }
`;

const useSignup = () => {
  const [mutateFn, { loading, error: gqlError }] = useMutation(SIGNUP_MUTATION);
  const [error, clearError] = useGqlError(gqlError);

  const signup = useCallback(
    async ({ confirmPassword, ...input }) => {
      const { data } = await mutateFn({
        variables: { input },
      });

      localStorage.setItem('token', data.createUser);
      document.dispatchEvent(new Event('login'));
    },
    [mutateFn],
  );

  return { signup, loading, error, clearError };
};

export default useSignup;

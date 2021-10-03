import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import useGqlError from './useGqlError';

const SIGNIN_MUTATION = gql`
  mutation Signin($input: LoginDto!) {
    login(input: $input)
  }
`;

const useSignin = () => {
  const [mutateFn, { loading, error: gqlError }] = useMutation(SIGNIN_MUTATION);
  const [error, clearError] = useGqlError(gqlError);

  const signin = useCallback(
    async (input) => {
      const { data } = await mutateFn({
        variables: { input },
      });

      localStorage.setItem('token', data.login);
      document.dispatchEvent(new Event('login'));

      window.location.href = 'home';
    },
    [mutateFn],
  );

  return { signin, loading, error, clearError };
};

export default useSignin;

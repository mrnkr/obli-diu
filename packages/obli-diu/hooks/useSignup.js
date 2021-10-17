import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useErrorNotifier from './useErrorNotifier';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserDto!) {
    createUser(input: $input)
  }
`;

const useSignup = () => {
  const router = useRouter();
  const [mutateFn, { loading, error }] = useMutation(SIGNUP_MUTATION);
  useErrorNotifier(error);

  const signup = useCallback(
    async ({ confirmPassword, ...input }) => {
      const { data } = await mutateFn({
        variables: { input },
      });

      localStorage.setItem('token', data.createUser);
      document.dispatchEvent(new Event('login'));

      await router.push('/home');
    },
    [mutateFn, router],
  );

  return { signup, loading };
};

export default useSignup;

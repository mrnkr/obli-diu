import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useErrorNotifier from './useErrorNotifier';

const SIGNIN_MUTATION = gql`
  mutation Signin($input: LoginDto!) {
    login(input: $input)
  }
`;

const useSignin = () => {
  const router = useRouter();
  const [mutateFn, { loading, error }] = useMutation(SIGNIN_MUTATION);
  useErrorNotifier(error);

  const signin = useCallback(
    async (input) => {
      const { data } = await mutateFn({
        variables: { input },
      });

      localStorage.setItem('token', data.login);
      document.dispatchEvent(new Event('login'));

      await router.push('/home');
    },
    [mutateFn, router],
  );

  return { signin, loading };
};

export default useSignin;

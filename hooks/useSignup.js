import { useState, useEffect, useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserDto!) {
    createUser(input: $input) {
      id
      displayName
      email
    }
  }
`;

const useSignup = () => {
  const [err, setErr] = useState();

  const [mutateFn, { loading, error }] = useMutation(SIGNUP_MUTATION);

  useEffect(() => {
    if (error && error.message) {
      setErr(error.message);
    }
  }, [error]);

  const signup = useCallback(
    async ({ displayName, email, password }) => {
      await mutateFn({
        variables: { input: { displayName, email, password } },
      });
    },
    [mutateFn],
  );

  const clearError = useCallback(() => {
    setErr();
  }, []);

  return { signup, loading, error: err, clearError };
};

export default useSignup;

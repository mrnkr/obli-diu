import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import signupSchema from '../schemas/signupSchema';
import useErrorNotifier from './useErrorNotifier';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: CreateUserDto!) {
    createUser(input: $input)
  }
`;

const useSignupForm = ({ afterSubmit }) => {
  const [mutateFn, { error }] = useMutation(SIGNUP_MUTATION);
  useErrorNotifier(error);

  const signup = useCallback(
    async ({ confirmPassword, ...input }) => {
      const { data } = await mutateFn({
        variables: { input },
      });

      await afterSubmit(data);
    },
    [afterSubmit, mutateFn],
  );

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: signup,
  });

  return formik;
};

export default useSignupForm;

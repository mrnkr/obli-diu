import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import signinSchema from '../schemas/signinSchema';
import useErrorNotifier from './useErrorNotifier';

const SIGNIN_MUTATION = gql`
  mutation Signin($input: LoginDto!) {
    login(input: $input)
  }
`;

const useSigninForm = ({ afterSubmit }) => {
  const [mutateFn, { error }] = useMutation(SIGNIN_MUTATION);
  useErrorNotifier(error);

  const signin = useCallback(
    async (input) => {
      const { data } = await mutateFn({
        variables: { input },
      });

      await afterSubmit(data);
    },
    [afterSubmit, mutateFn],
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signinSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: signin,
  });

  return formik;
};

export default useSigninForm;

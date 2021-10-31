import * as yup from 'yup';

const signupSchema = yup.object().shape({
  displayName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().when('password', {
    is: (val) => val?.length > 0,
    then: yup.string().oneOf([yup.ref('password')], "Passwords don't match"),
  }),
});

export default signupSchema;

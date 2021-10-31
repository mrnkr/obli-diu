import * as yup from 'yup';

const signinSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default signinSchema;

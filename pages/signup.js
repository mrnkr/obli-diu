import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import PersonAdd from '@material-ui/icons/Person';
import { Link } from '@material-ui/core';

const SignUp = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      userName: yup.string().email().required(),
      password: yup.string().required(),
      confirmPassword: yup.string().when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref('password')], 'Both password need to be the same'),
      }),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={classes.self}>
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Avatar className={classes.decoration}>
              <PersonAdd />
            </Avatar>
            <TextField
              className={classes.input}
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              autoFocus
              fullWidth
            />
            <TextField
              className={classes.input}
              name="userName"
              type="text"
              value={formik.values.userName}
              onChange={formik.handleChange}
              label="User Name"
              error={!!formik.errors.userName}
              helperText={formik.errors.userName}
              autoFocus
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              fullWidth
            />
            <TextField
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              label="Confirm Password"
              error={!!formik.errors.confirmPassword}
              helperText={formik.errors.confirmPassword}
              fullWidth
            />
          </CardContent>

          <CardActions>
            <div className={classes.filler} />
            <Link href="/">
              <Button size="small">SIGN IN</Button>
            </Link>
            <Button size="small" type="submit">
              SIGN UP
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  self: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.background.default,
  },
  decoration: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(1.5),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  filler: {
    flex: 1,
    height: '100%',
  },
}));

export default SignUp;

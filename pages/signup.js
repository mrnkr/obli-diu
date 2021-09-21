import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import PersonAdd from '@material-ui/icons/Person';
import Link from 'next/link';
import useSignup from '../hooks/useSignup';
import ScreenBlocker from '../components/ScreenBlocker/ScreenBlocker';

const SignUp = () => {
  const classes = useStyles();
  const signup = useSignup();

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      displayName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirmPassword: yup.string().when('password', {
        is: (val) => val?.length > 0,
        then: yup
          .string()
          .oneOf([yup.ref('password')], "Passwords don't match"),
      }),
    }),
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: signup.signup,
  });

  return (
    <div className={classes.self}>
      <ScreenBlocker visible={signup.loading} />
      <Card>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Avatar className={classes.decoration}>
              <PersonAdd />
            </Avatar>
            <TextField
              className={classes.input}
              name="displayName"
              type="text"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              label="User Name"
              error={!!formik.errors.displayName}
              helperText={formik.errors.displayName}
              autoFocus
              fullWidth
            />
            <TextField
              className={classes.input}
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              label="Email"
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              fullWidth
            />
            <TextField
              className={classes.input}
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
            <Link href="/" passHref>
              <Button size="small">SIGN IN</Button>
            </Link>
            <Button size="small" type="submit">
              SIGN UP
            </Button>
          </CardActions>
        </form>
      </Card>

      <Snackbar
        open={!!signup.error}
        autoHideDuration={6000}
        onClose={signup.clearError}
        message={signup.error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={signup.clearError}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
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

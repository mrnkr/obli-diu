import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// import Snackbar from '@material-ui/core/Snackbar';
// import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';

// import useSignin from './useSignin';

const Signin = () => {
  const classes = useStyles();
  // const signin = useSignin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
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
              <LockIcon />
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
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
              error={!!formik.errors.password}
              helperText={formik.errors.password}
              fullWidth
            />
          </CardContent>

          <CardActions>
            <div className={classes.filler} />
            <Button size="small">SIGN UP</Button>
            <Button size="small" type="submit">
              SIGN IN
            </Button>
          </CardActions>
        </form>
      </Card>

      {/* <Snackbar
        open={!!signin.error}
        autoHideDuration={6000}
        onClose={signin.clearError}
        message={signin.error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={signin.clearError}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      /> */}
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

export default Signin;

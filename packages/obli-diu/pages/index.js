import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSigninForm from 'shared/hooks/useSigninForm';
import useGuard from 'shared/hooks/useGuard';

const Signin = () => {
  const classes = useStyles();
  const router = useRouter();

  const form = useSigninForm({
    afterSubmit: async (data) => {
      localStorage.setItem('token', data.login);
      dispatchEvent(new Event('login'));

      await router.push('/home');
    },
  });

  useGuard((userInfo) => {
    if (userInfo.id) {
      router.replace('/home');
    }
  });

  return (
    <div className={classes.self}>
      <Card>
        <form onSubmit={form.handleSubmit}>
          <CardContent>
            <Avatar className={classes.decoration}>
              <LockIcon />
            </Avatar>
            <TextField
              className={classes.input}
              name="email"
              type="text"
              value={form.values.email}
              onChange={form.handleChange}
              label="Email"
              error={!!form.errors.email}
              helperText={form.errors.email}
              autoFocus
              fullWidth
            />
            <TextField
              name="password"
              type="password"
              value={form.values.password}
              onChange={form.handleChange}
              label="Password"
              error={!!form.errors.password}
              helperText={form.errors.password}
              fullWidth
            />
          </CardContent>

          <CardActions>
            <div className={classes.filler} />
            <Link href="/signup" passHref>
              <Button size="small">SIGN UP</Button>
            </Link>
            <Button size="small" type="submit" disabled={form.isSubmitting}>
              {form.isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                'SIGN IN'
              )}
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

export default Signin;

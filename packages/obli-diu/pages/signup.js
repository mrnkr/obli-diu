import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PersonAdd from '@material-ui/icons/Person';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSignupForm from 'shared/hooks/useSignupForm';
import useGuard from 'shared/hooks/useGuard';

const SignUp = () => {
  const classes = useStyles();
  const router = useRouter();

  const form = useSignupForm({
    afterSubmit: async (data) => {
      localStorage.setItem('token', data.createUser);
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
              <PersonAdd />
            </Avatar>
            <TextField
              className={classes.input}
              name="displayName"
              type="text"
              value={form.values.displayName}
              onChange={form.handleChange}
              label="User Name"
              error={!!form.errors.displayName}
              helperText={form.errors.displayName}
              autoFocus
              fullWidth
            />
            <TextField
              className={classes.input}
              name="email"
              type="text"
              value={form.values.email}
              onChange={form.handleChange}
              label="Email"
              error={!!form.errors.email}
              helperText={form.errors.email}
              fullWidth
            />
            <TextField
              className={classes.input}
              name="password"
              type="password"
              value={form.values.password}
              onChange={form.handleChange}
              label="Password"
              error={!!form.errors.password}
              helperText={form.errors.password}
              fullWidth
            />
            <TextField
              name="confirmPassword"
              type="password"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              label="Confirm Password"
              error={!!form.errors.confirmPassword}
              helperText={form.errors.confirmPassword}
              fullWidth
            />
          </CardContent>

          <CardActions>
            <div className={classes.filler} />
            <Link href="/" passHref>
              <Button size="small">SIGN IN</Button>
            </Link>
            <Button size="small" type="submit" disabled={form.isSubmitting}>
              {form.isSubmitting ? (
                <CircularProgress size={16} color="default" />
              ) : (
                'SIGN UP'
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

export default SignUp;

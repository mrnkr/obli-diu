import React from 'react';
import { useRouter } from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useAuth from 'shared/hooks/useAuth';
import useMountEffect from 'shared/hooks/useMountEffect';

import Sidebar from '../components/Sidebar';

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const user = useAuth();

  useMountEffect(() => {
    if (!user) {
      router.replace('/');
    }
  });

  return (
    <Grid container component={Paper} className={classes.chatSection}>
      <Sidebar />
    </Grid>
  );
};

const useStyles = makeStyles({
  chatSection: {
    width: '100%',
    height: '100vh',
  },
});

export default Home;

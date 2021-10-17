import React, { useContext, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingContext from '../../contexts/LoadingContext';

const LoadingIndicator = () => {
  const classes = useStyles();
  const [loadingCounter] = useContext(LoadingContext);

  const isLoading = useMemo(() => loadingCounter > 0, [loadingCounter]);

  return (
    <>
      {isLoading && (
        <div className={classes.self}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  self: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.background.default,
    opacity: 0.6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default LoadingIndicator;

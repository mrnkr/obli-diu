import React, { useCallback, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ErrorContext from '../../contexts/ErrorContext';

const ErrorSnackbar = () => {
  const [error, setError] = useContext(ErrorContext);

  const clearError = useCallback(() => {
    setError();
  }, [setError]);

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={clearError}
      message={error}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={clearError}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default ErrorSnackbar;

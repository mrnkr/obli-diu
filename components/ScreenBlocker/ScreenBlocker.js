import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LoadingIndicator from '@material-ui/core/CircularProgress';

const ScreenBlocker = ({ visible }) => {
  const classes = useStyles();

  return visible ? (
    <div className={classes.self}>
      <LoadingIndicator />
    </div>
  ) : null;
};

ScreenBlocker.propTypes = {
  visible: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  self: {
    opacity: 0.6,
    backgroundColor: theme.palette.grey[600],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },
}));

export default ScreenBlocker;

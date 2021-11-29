import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import makeStyles from '@material-ui/core/styles/makeStyles';

const RankingPopup = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">Ranking</DialogTitle>
    </Dialog>
  );
};

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  name: {
    marginRight: '8px',
  },
});

RankingPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  filterPredicate: PropTypes.func.isRequired,
};

export default RankingPopup;

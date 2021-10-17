import React, { useCallback, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';

const Composer = (props) => {
  const classes = useStyles();

  const [msg, setMsg] = useState('');

  const onClickSend = useCallback(() => {
    props.onClickSend(msg);
    setMsg('');
  }, [msg, props]);

  const onEnter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onClickSend();
      }
    },
    [onClickSend],
  );

  const onChange = useCallback(
    (e) => {
      props.onStartWriting();
      setMsg(e.target.value);
    },
    [props],
  );

  return (
    <Grid container className={classes.self}>
      <Grid xs={11} item>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          value={msg}
          onKeyPress={onEnter}
          onChange={onChange}
          autoFocus
          fullWidth
        />
      </Grid>
      <Grid xs={1} item align="right">
        <Tooltip title="Send message" aria-label="send">
          <IconButton aria-label="add" onClick={onClickSend}>
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  self: {
    padding: 16,
  },
}));

Composer.propTypes = {
  onClickSend: PropTypes.func.isRequired,
  onStartWriting: PropTypes.func.isRequired,
};

export default Composer;

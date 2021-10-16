import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import useChangeEffect from '../../hooks/useChangeEffect';

const Composer = (props) => {
  const [msg, setMsg] = useState('');

  useChangeEffect((cur, prev) => {
    const startedWriting = prev?.length === 0 && cur?.length > 0;
    const stoppedWriting = prev?.length > 0 && cur?.length === 0;

    if (startedWriting) {
      props.onStartWriting();
    }

    if (stoppedWriting) {
      props.onStopWriting();
    }
  }, msg);

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

  const onChange = useCallback((e) => {
    setMsg(e.target.value);
  }, []);

  return (
    <Grid container style={{ padding: '20px' }}>
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

Composer.propTypes = {
  onClickSend: PropTypes.func.isRequired,
  onStartWriting: PropTypes.func,
  onStopWriting: PropTypes.func,
};

export default Composer;

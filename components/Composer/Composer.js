import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

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

  const [anchorEl, setAnchorEl] = useState(null);

  const openEmojiPopover = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeEmojiPopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = useMemo(() => !!anchorEl, [anchorEl]);
  const id = useMemo(() => (open ? 'simple-popover' : undefined), [open]);

  const onEmojiClick = useCallback(
    (_, emojiObject) => {
      setMsg(msg + emojiObject.emoji);
      closeEmojiPopover();
    },
    [closeEmojiPopover, msg],
  );

  return (
    <Grid container className={classes.self}>
      <Grid sm={1} xs={2} item align="center">
        <Tooltip title="Insert emoji" aria-label="emoji">
          <IconButton onClick={openEmojiPopover}>
            <EmojiEmotionsIcon />
          </IconButton>
        </Tooltip>
        <Popover
          className={classes.emojiPicker}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={closeEmojiPopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Popover>
      </Grid>
      <Grid sm={10} xs={8} item>
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
      <Grid sm={1} xs={2} item align="center">
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
  emojiPicker: {
    '& *': {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    '& .emoji-group::before': {
      backgroundColor: `${theme.palette.background.paper} !important`,
      color: `${theme.palette.text.primary} !important`,
    },
  },
}));

Composer.propTypes = {
  onClickSend: PropTypes.func.isRequired,
  onStartWriting: PropTypes.func.isRequired,
};

export default Composer;

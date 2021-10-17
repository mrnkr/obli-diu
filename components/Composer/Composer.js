import React, { useCallback, useState, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import Picker from 'emoji-picker-react';
import Popover from '@material-ui/core/Popover';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useTheme from '@material-ui/core/styles/useTheme';

const Composer = (props) => {
  const theme = useTheme();
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
        <Tooltip title="Add emoji" aria-label="emoji">
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
          <Picker
            // pickerStyle={{
            //   background: theme.palette.background.paper,
            //   color: theme.palette.text.primary,
            // }}
            onEmojiClick={onEmojiClick}
          />
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

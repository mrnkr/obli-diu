import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';

const NoChatsPlaceholder = () => {
  const classes = useStyles();

  return (
    <div className={classes.self}>
      <Typography>
        No chats to show yet... Click on <PersonAdd /> and start chatting!
      </Typography>
    </div>
  );
};

const useStyles = makeStyles({
  self: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    padding: 16,
  },
});

export default NoChatsPlaceholder;

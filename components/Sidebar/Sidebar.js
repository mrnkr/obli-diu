import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreVert from '@material-ui/icons/MoreVert';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import md5 from 'md5';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Popover from '@material-ui/core/Popover';
import useAuth from '../../hooks/useAuth';
import useChatrooms from '../../hooks/useChatrooms';
import usePopup from '../../hooks/usePopup';
import useHeartbeat from '../../hooks/useHeartbeat';
import ChatroomListItem from './ChatroomListItem';
import UserListPopup from './UserListPopup';

const Sidebar = ({ className }) => {
  useHeartbeat();

  const user = useAuth();
  const classes = useStyles();
  const { data: chatrooms } = useChatrooms();
  const [userListPopupVisible, showUserListPopup, closeUserListPopup] =
    usePopup();

  const userName = useMemo(() => user?.displayName ?? user?.email, [user]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <UserListPopup
        open={userListPopupVisible}
        onPress={closeUserListPopup}
        handleClose={closeUserListPopup}
      />
      <Grid xs={12} md={3} item className={`${classes.sidebar} ${className}`}>
        <List className={classes.mainList}>
          <ListItem key={user?.email}>
            <ListItemIcon>
              <Avatar
                className={classes.avatar}
                alt={userName}
                src={`https://www.gravatar.com/avatar/${md5(
                  user?.email ?? '',
                )}`}
              />
            </ListItemIcon>
            <ListItemText primary={userName}></ListItemText>
            <ListItemIcon>
              <IconButton onClick={showUserListPopup}>
                <PersonAdd />
              </IconButton>
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={handleClick}>
                <MoreVert />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
          <List>
            <ListItem disablePadding>
              <Button component="a" startIcon={<ExitToApp />}>
                Logout
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <FormControlLabel
                control={<Switch size="small" />}
                label="Dark Mode"
              />
            </ListItem>
          </List>
        </Popover>
        <Divider />
        <List>
          {chatrooms.map((chatroom) => (
            <ChatroomListItem
              key={chatroom.id}
              chatroom={chatroom}
              user={user}
            />
          ))}
        </List>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  sidebar: {
    borderRight: '0px solid #e0e0e0',
    overflow: 'hidden',
  },
  mainList: {
    padding: 0,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  [theme.breakpoints.up('md')]: {
    sidebar: {
      borderRight: '1px solid #e0e0e0',
    },
  },
}));

Sidebar.propTypes = {
  className: PropTypes.string,
};

Sidebar.defaultProps = {
  className: '',
};

export default Sidebar;

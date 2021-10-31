import React, { useCallback, useContext, useMemo, useState } from 'react';
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
import MoreVert from '@material-ui/icons/MoreVert';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Popover from '@material-ui/core/Popover';
import { useRouter } from 'next/router';
import ListSubheader from '@material-ui/core/ListSubheader';
import useAuth from 'shared/hooks/useAuth';
import useChatrooms from 'shared/hooks/useChatrooms';
import usePopup from 'shared/hooks/usePopup';
import useHeartbeat from 'shared/hooks/useHeartbeat';
import ColorModeContext from 'shared/contexts/ColorModeContext';
import gravatar from 'shared/helpers/gravatar';
import ChatroomListItem from './ChatroomListItem';
import UserListPopup from './UserListPopup';
import NoChatsPlaceholder from './NoChatsPlaceholder';

const Sidebar = ({ className }) => {
  useHeartbeat();

  const classes = useStyles();
  const router = useRouter();
  const user = useAuth();
  const chatrooms = useChatrooms();
  const [userListPopupVisible, showUserListPopup, closeUserListPopup] =
    usePopup();

  const colorMode = useContext(ColorModeContext);

  const userName = useMemo(() => user?.displayName ?? user?.email, [user]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(async () => {
    localStorage.removeItem('token');
    await router.replace('/');
    router.reload();
  }, [router]);

  const open = useMemo(() => !!anchorEl, [anchorEl]);
  const id = useMemo(() => (open ? 'simple-popover' : undefined), [open]);

  return (
    <>
      <UserListPopup
        open={userListPopupVisible}
        handleClose={closeUserListPopup}
      />
      <Grid xs={12} md={3} item className={`${classes.sidebar} ${className}`}>
        <List className={classes.mainList}>
          <ListSubheader className={classes.listSubheader}>
            <ListItem key={user?.email}>
              <ListItemIcon>
                <Avatar
                  className={classes.avatar}
                  alt={userName}
                  src={gravatar(user)}
                />
              </ListItemIcon>
              <ListItemText primary={userName}></ListItemText>
              <ListItemIcon>
                <IconButton onClick={showUserListPopup}>
                  <PersonAdd />
                </IconButton>
                <IconButton
                  size="medium"
                  aria-label="display more actions"
                  edge="end"
                  color="inherit"
                  onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </ListSubheader>
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
              <ListItem button>
                <ExitToApp />
                <ListItemText
                  className={classes.listItem}
                  onClick={handleLogout}
                  primary="Log out"
                />
              </ListItem>
              <ListItem button>
                <FormControlLabel
                  className={classes.formControl}
                  control={
                    <Switch
                      size="small"
                      checked={colorMode.mode === 'dark'}
                      onClick={colorMode.toggleColorMode}
                    />
                  }
                  label="Dark Mode"
                />
              </ListItem>
            </List>
          </Popover>
          <Divider />
          {chatrooms.length ? (
            chatrooms.map((chatroom) => (
              <ChatroomListItem
                key={chatroom.id}
                chatroom={chatroom}
                user={user}
              />
            ))
          ) : (
            <NoChatsPlaceholder />
          )}
        </List>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  listSubheader: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
  listItem: {
    marginLeft: 4,
  },
  formControl: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  sidebar: {
    borderRight: '0px solid #e0e0e0',
    overflow: 'hidden',
    maxHeight: '100%',
  },
  mainList: {
    padding: 0,
    flex: 1,
    width: '100%',
    overflowY: 'scroll',
    height: '100%',
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

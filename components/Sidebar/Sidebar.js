import React, { useMemo } from 'react';
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
import PersonAdd from '@material-ui/icons/PersonAdd';
import md5 from 'md5';
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

  return (
    <>
      <UserListPopup
        open={userListPopupVisible}
        onPress={closeUserListPopup}
        handleClose={closeUserListPopup}
      />
      <Grid xs={12} md={3} item className={`${classes.sidebar} ${className}`}>
        <List>
          <ListItem key={user?.email}>
            <ListItemIcon>
              <Avatar
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
            </ListItemIcon>
          </ListItem>
        </List>
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

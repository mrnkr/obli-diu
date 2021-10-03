import React, { useMemo } from 'react';
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

import useAuth from '../../hooks/useAuth';
import useChatrooms from '../../hooks/useChatrooms';
import ChatroomListItem from './ChatroomListItem';

const Sidebar = () => {
  const user = useAuth();
  const classes = useStyles();
  const { data: chatrooms } = useChatrooms();

  const userName = useMemo(() => user?.displayName ?? user?.email, [user]);

  return (
    <>
      <Grid item xs={3} className={classes.borderRight500}>
        <List>
          <ListItem key={user?.email}>
            <ListItemIcon>
              <Avatar alt={userName} src={user?.photoURL} />
            </ListItemIcon>
            <ListItemText primary={userName}></ListItemText>
            <ListItemIcon>
              <IconButton>
                <PersonAdd />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
        {/* <Divider />
        <Grid item xs={12} style={{ padding: '10px' }}>
          <TextField
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid> */}
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

const useStyles = makeStyles({
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
});

export default Sidebar;

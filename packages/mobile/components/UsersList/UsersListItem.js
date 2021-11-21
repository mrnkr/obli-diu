import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import gravatar from 'shared/helpers/gravatar';
import makeStyles from '../../hooks/makeStyles';

const UsersListItem = ({ user, onPress, topDivider }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <ListItem topDivider={topDivider}>
        <Avatar
          title={user.displayName}
          source={{ uri: gravatar(user) }}
          rounded
        />
        <ListItem.Content style={styles.content}>
          <ListItem.Title>{user.displayName ?? user.email}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    content: {
      marginLeft: 8,
    },
  }),
);

UsersListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  topDivider: PropTypes.bool,
};

export default memo(UsersListItem);

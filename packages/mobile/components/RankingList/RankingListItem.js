import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar, Rating } from 'react-native-elements';
import gravatar from 'shared/helpers/gravatar';
import makeStyles from '../../hooks/makeStyles';

const RankingListItem = ({ user, topDivider }) => {
  const styles = useStyles();

  return (
    <ListItem topDivider={topDivider}>
      <Avatar
        title={user.displayName}
        source={{ uri: gravatar(user) }}
        rounded
      />
      <ListItem.Content style={styles.content}>
        <ListItem.Title>{user.displayName ?? user.email}</ListItem.Title>
        <ListItem.Subtitle>
          <Rating fractions="{1}" startingValue="{3.3}" readonly />
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const useStyles = makeStyles(() =>
  StyleSheet.create({
    content: {
      marginLeft: 8,
    },
  }),
);

RankingListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
  topDivider: PropTypes.bool,
};

export default memo(RankingListItem);

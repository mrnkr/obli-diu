import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar, AirbnbRating } from 'react-native-elements';
import gravatar from 'shared/helpers/gravatar';
import makeStyles from '../../hooks/makeStyles';

const RankingListItem = ({ user, topDivider, rating }) => {
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
          <AirbnbRating showRating={false} defaultRating={5 - rating} />
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
  rating: PropTypes.number,
};

export default memo(RankingListItem);

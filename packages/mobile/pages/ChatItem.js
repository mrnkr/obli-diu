import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';

const ChatItem = ({ item }) => {
  return (
    <ListItem bottomDivider>
      <Avatar
        title={item.name[0]}
        source={item.avatar_url && { uri: item.avatar_url }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

ChatItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    subtitle: PropTypes.string,
    // eslint-disable-next-line camelcase
    avatar_url: PropTypes.string,
  }),
};

export default ChatItem;

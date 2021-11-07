import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem, Avatar, Tab, TabView, Text } from 'react-native-elements';
import makeStyles from '../hooks/makeStyles';

const Chatlist = () => {
  const styles = useStyles();
  const [people, setPeople] = useState([
    { name: 'Amy Farha', subtitle: 'Vice President' },
    {
      name: 'Chris Jackson',
      // eslint-disable-next-line camelcase
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
    {
      name: 'Chris Jackson',
      // eslint-disable-next-line camelcase
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
    {
      name: 'Chris Jackson',
      // eslint-disable-next-line camelcase
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
    {
      name: 'Chris Jackson',
      // eslint-disable-next-line camelcase
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
    {
      name: 'Chris Jackson',
      // eslint-disable-next-line camelcase
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
    {
      name: 'Chris Jackson',
      // eslint-disable-next-line camelcase
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ]);
  const [index, setIndex] = useState(1);

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => (
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

  return (
    <View contentContainerStyle={styles.self}>
      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="chats" />
        <Tab.Item title="users" />
        <Tab.Item title="usage" />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>
      <FlatList
        contentContainerStyle={styles.self}
        keyExtractor={keyExtractor}
        data={people}
        renderItem={renderItem}
      />
    </View>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      marginBottom: safeAreaInsets.bottom,
      marginTop: safeAreaInsets.top,
    },
  }),
);

export default Chatlist;

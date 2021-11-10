import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import {
  Tab,
  TabView,
  Text,
  Header,
  Icon,
  Button,
} from 'react-native-elements';
import useChatrooms from 'shared/hooks/useChatrooms';
import { useTheme } from '@react-navigation/native';
import makeStyles from '../hooks/makeStyles';
import ChatItem from './ChatItem';
import ChatlistEmptyPlaceholder from './ChatlistEmptyPlaceholder';

const Chatlist = () => {
  const styles = useStyles();
  const theme = useTheme();
  const chatrooms = useChatrooms();

  const [people, setPeople] = useState([
    { name: 'Amy Farha', subtitle: 'Vice President' },
    {
      name: 'Chris Jackson',
      // eslint-disable-next-line camelcase
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'This should be the message preview wich is a long text',
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
      subtitle: 'This should be the message preview wich is a long text',
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

  const [index, setIndex] = useState(0);

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => <ChatItem item={item} />;

  return (
    <SafeAreaView style={styles.self}>
      <Header
        placement="left"
        centerComponent={{
          text: 'Chat App',
          style: styles.centerComponent,
        }}
        rightComponent={
          <Button
            type="clear"
            icon={<Icon name="logout" color={theme.colors.text} />}
          />
        }
        containerStyle={styles.header}
      />
      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="chats" />
        <Tab.Item title="users" />
        <Tab.Item title="usage" />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item />
        <TabView.Item />
      </TabView>

      <FlatList
        keyExtractor={keyExtractor}
        data={people}
        renderItem={renderItem}
        ListEmptyComponent={<ChatlistEmptyPlaceholder />}
      />
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      marginBottom: safeAreaInsets.bottom,
      marginTop: safeAreaInsets.top,
    },
    header: {
      backgroundColor: theme.colors.background,
    },
    centerComponent: {
      color: theme.colors.text,
      fontSize: 24,
    },
  }),
);

export default Chatlist;

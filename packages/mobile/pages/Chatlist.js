import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Tab, TabView, Text } from 'react-native-elements';
import useChatrooms from 'shared/hooks/useChatrooms';
import makeStyles from '../hooks/makeStyles';
import ChatItem from './ChatItem';
import ChatlistEmptyPlaceholder from './ChatlistEmptyPlaceholder';

const Chatlist = () => {
  const styles = useStyles();
  const chatrooms = useChatrooms();

  const [people, setPeople] = useState([]);

  const [index, setIndex] = useState(0);

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => <ChatItem item={item} />;

  return (
    <SafeAreaView style={styles.self}>
      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="chats" />
        <Tab.Item title="users" />
        <Tab.Item title="usage" />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item />
        <TabView.Item />
        <TabView.Item />
      </TabView>

      <FlatList
        keyExtractor={keyExtractor}
        data={chatrooms}
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
  }),
);

export default Chatlist;

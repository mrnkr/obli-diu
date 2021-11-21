import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import useChatrooms from 'shared/hooks/useChatrooms';
import { useTheme } from '@react-navigation/native';
import makeStyles from '../../hooks/makeStyles';
import ChatlistEmptyPlaceholder from './ChatListEmptyPlaceholder';
import ChatroomListItem from './ChatroomListItem';

const ChatList = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const chatrooms = useChatrooms();

  const goToChatroom = useCallback(
    (chatroomId) => () => {
      navigation.navigate('Chat', { chatroomId });
    },
    [navigation],
  );

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }) => (
      <ChatroomListItem
        chatroom={item}
        onPress={goToChatroom(item.id)}
        topDivider={index > 0}
      />
    ),
    [goToChatroom],
  );

  return (
    <>
      <Header
        placement="left"
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        centerComponent={{ text: 'Chats', style: styles.centerComponent }}
      />
      <FlatList
        style={styles.listContentContainer}
        keyExtractor={keyExtractor}
        data={chatrooms}
        renderItem={renderItem}
        ListEmptyComponent={<ChatlistEmptyPlaceholder />}
      />
    </>
  );
};

ChatList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    centerComponent: {
      color: theme.colors.text,
      fontSize: 24,
    },
    listContentContainer: {
      paddingBottom: safeAreaInsets.bottom,
    },
  }),
);

export default ChatList;

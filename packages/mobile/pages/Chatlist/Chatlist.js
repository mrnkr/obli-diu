import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import useChatrooms from 'shared/hooks/useChatrooms';
import { useTheme } from '@react-navigation/native';
import makeStyles from '../../hooks/makeStyles';
import ChatlistEmptyPlaceholder from './ChatlistEmptyPlaceholder';
import ChatroomListItem from './ChatroomListItem';

const Chatlist = () => {
  const styles = useStyles();
  const theme = useTheme();
  const chatrooms = useChatrooms();

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => <ChatroomListItem chatroom={item} />,
    [],
  );

  return (
    <>
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

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.background,
    },
    centerComponent: {
      color: theme.colors.text,
      fontSize: 24,
    },
    listContentContainer: {
      paddingBottom: safeAreaInsets.bottom,
    },
  }),
);

export default Chatlist;

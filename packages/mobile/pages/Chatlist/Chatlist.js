import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import useChatrooms from 'shared/hooks/useChatrooms';
import makeStyles from '../../hooks/makeStyles';
import ChatlistEmptyPlaceholder from './ChatlistEmptyPlaceholder';
import ChatroomListItem from './ChatroomListItem';

const Chatlist = ({ navigation }) => {
  const styles = useStyles();
  const chatrooms = useChatrooms();

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => <ChatroomListItem chatroom={item} navigation={navigation} />,
    [navigation],
  );

  return (
    <>
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

Chatlist.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
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

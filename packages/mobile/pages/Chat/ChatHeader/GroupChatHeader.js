import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import useGroupChatroomDisplay from 'shared/hooks/useGroupChatroomDisplay';
import makeStyles from '../../../hooks/makeStyles';

const GroupChatHeader = ({ chatroom }) => {
  const styles = useStyles();
  const { groupName } = useGroupChatroomDisplay(chatroom);

  return (
    <View style={styles.self}>
      <Text style={styles.name}>{groupName}</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    self: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flex: 1,
    },
    name: {
      fontWeight: 'bold',
    },
  }),
);

GroupChatHeader.propTypes = {
  chatroom: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
        email: PropTypes.string,
      }),
    ),
    isGroup: PropTypes.bool.isRequired,
    lastActivity: PropTypes.any,
  }),
};

export default GroupChatHeader;

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import useSingleUserChatroomDisplay from 'shared/hooks/useSingleUserChatroomDisplay';
import useUserStatus from 'shared/hooks/useUserStatus';
import makeStyles from '../../../hooks/makeStyles';

const SingleUserChatHeader = ({ chatroom }) => {
  const styles = useStyles();
  const { otherUser, userName } = useSingleUserChatroomDisplay(chatroom);
  const status = useUserStatus(chatroom, otherUser?.id);

  return (
    <View style={styles.self}>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.status}>{status}</Text>
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
    status: {
      fontSize: 12,
    },
  }),
);

SingleUserChatHeader.propTypes = {
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

export default SingleUserChatHeader;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import makeStyles from '../hooks/makeStyles';

const ChatlistEmptyPlaceholder = () => {
  const styles = useStyles();

  return (
    <View style={styles.self}>
      <Text style={styles.title}>No chats yet!</Text>
    </View>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginBottom: safeAreaInsets.bottom,
      marginTop: safeAreaInsets.top,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 36,
      marginBottom: 16,
    },
  }),
);

export default ChatlistEmptyPlaceholder;

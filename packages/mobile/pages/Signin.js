import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import makeStyles from '../hooks/makeStyles';

const Signin = () => {
  const styles = useStyles();
  return (
    <View style={styles.self}>
      <Text style={styles.text} h1>
        Signin screen coming soon
      </Text>
    </View>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
    },
    text: {
      textAlign: 'center',
      marginBottom: safeAreaInsets.bottom,
    },
  }),
);

export default Signin;

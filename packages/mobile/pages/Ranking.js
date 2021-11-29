import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import makeStyles from '../hooks/makeStyles';

const Ranking = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Header
      placement="left"
      backgroundColor={theme.colors.background}
      centerComponent={{ text: 'Ranking', style: styles.centerComponent }}
    />
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    self: {
      backgroundColor: theme.colors.background,
      marginBottom: safeAreaInsets.bottom,
      marginTop: safeAreaInsets.top,
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

export default Ranking;

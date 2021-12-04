import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import useAuth from 'shared/hooks/useAuth';
import useChatrooms from 'shared/hooks/useChatrooms';
import usersImNotChattingWith from 'shared/helpers/usersImNotChattingWith';
import makeStyles from '../../hooks/makeStyles';
import RankingList from '../../components/RankingList';

const Ranking = () => {
  const styles = useStyles();
  const theme = useTheme();
  const user = useAuth();
  const chatrooms = useChatrooms();

  return (
    <>
      <Header
        placement="left"
        backgroundColor={theme.colors.background}
        centerComponent={{ text: 'Ranking', style: styles.centerComponent }}
      />
      <RankingList filterPredicate={usersImNotChattingWith(user, chatrooms)} />
    </>
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

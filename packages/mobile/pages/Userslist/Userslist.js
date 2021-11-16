import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import useUsers from 'shared/hooks/useUsers';
import makeStyles from '../../hooks/makeStyles';
import UserslistItem from './UserslistItem';
import UserslistEmptyPlaceholder from './UserslistEmptyPlaceholder';

const Userslist = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();
  const users = [];//useUsers();

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item }) => <UserslistItem chatroom={item} />,
    [],
  );

  return (
    <>
      <FlatList
        style={styles.listContentContainer}
        keyExtractor={keyExtractor}
        data={users}
        renderItem={renderItem}
        ListEmptyComponent={<UserslistEmptyPlaceholder />}
      />
    </>
  );
};

Userslist.propTypes = {
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

export default Userslist;

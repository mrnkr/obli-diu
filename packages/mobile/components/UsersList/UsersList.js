import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import useUsers from 'shared/hooks/useUsers';
import makeStyles from '../../hooks/makeStyles';
import UsersListItem from './UsersListItem';
import UsersListEmptyPlaceholder from './UsersListEmptyPlaceholder';

const UsersList = ({
  style,
  contentContainerStyle,
  onSelectUser,
  filterPredicate,
}) => {
  const styles = useStyles();
  const users = useUsers(filterPredicate);

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }) => (
      <UsersListItem
        user={item}
        onPress={onSelectUser(item.id)}
        topDivider={index > 0}
      />
    ),
    [onSelectUser],
  );

  return (
    <FlatList
      style={[styles.listContentContainer, style]}
      contentContainerStyle={contentContainerStyle}
      keyExtractor={keyExtractor}
      data={users}
      renderItem={renderItem}
      ListEmptyComponent={<UsersListEmptyPlaceholder />}
    />
  );
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

UsersList.propTypes = {
  style: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  onSelectUser: PropTypes.func,
  filterPredicate: PropTypes.func,
};

export default UsersList;

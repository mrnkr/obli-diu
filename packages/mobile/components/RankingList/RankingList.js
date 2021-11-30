import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import useUsers from 'shared/hooks/useUsers';
import makeStyles from '../../hooks/makeStyles';
import RankingListItem from './RankingListItem';
import RankingListEmptyPlaceholder from './RankingListEmptyPlaceholder';

const RankingList = ({ style, contentContainerStyle, filterPredicate }) => {
  const styles = useStyles();
  const users = useUsers(filterPredicate);

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }) => <RankingListItem user={item} topDivider={index > 0} />,
    [],
  );

  return (
    <FlatList
      style={[styles.listContentContainer, style]}
      contentContainerStyle={contentContainerStyle}
      keyExtractor={keyExtractor}
      data={users.slice(0, 10)}
      renderItem={renderItem}
      ListEmptyComponent={<RankingListEmptyPlaceholder />}
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

RankingList.propTypes = {
  style: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  onSelectUser: PropTypes.func,
  filterPredicate: PropTypes.func,
};

export default RankingList;

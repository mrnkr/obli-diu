import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StyleSheet } from 'react-native';
import useUsers from 'shared/hooks/useUsers';
import makeStyles from '../../hooks/makeStyles';
import RankingListItem from './RankingListItem';
import RankingListEmptyPlaceholder from './RankingListEmptyPlaceholder';

const RankingList = ({ style, contentContainerStyle, filterPredicate }) => {
  const styles = useStyles();
  const users = useUsers(filterPredicate);

  const data = useMemo(() => users.slice(0, 5), [users]);

  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(
    ({ item, index }) => (
      <RankingListItem user={item} topDivider={index > 0} rating={index} />
    ),
    [],
  );

  return (
    <>
      <FlatList
        style={[styles.listContentContainer, style]}
        contentContainerStyle={contentContainerStyle}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={<RankingListEmptyPlaceholder />}
      />
      <View style={styles.overlay} />
    </>
  );
};

const useStyles = makeStyles((theme, safeAreaInsets) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
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

RankingList.propTypes = {
  style: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  onSelectUser: PropTypes.func,
  filterPredicate: PropTypes.func,
};

export default RankingList;

import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import useErrorNotifier from './useErrorNotifier';
import useLoadingNotifier from './useLoadingNotifier';

const FETCH_ONCE = gql`
  query GetAllUsers {
    users {
      id
      displayName
      email
    }
  }
`;

const useUsers = (filterPredicate) => {
  const { loading, data, error } = useQuery(FETCH_ONCE);
  useLoadingNotifier(loading);
  useErrorNotifier(error);

  const users = useMemo(
    () => filterPredicate(data?.users),
    [data, filterPredicate],
  );

  return users;
};

export default useUsers;

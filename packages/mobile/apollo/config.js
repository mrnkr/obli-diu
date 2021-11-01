import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from 'apollo-link-context';

const httpAuthLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const rawHttpLink = new HttpLink({
  uri: `https://${API_URL}`,
  credentials: 'same-origin',
});

const httpLink = httpAuthLink.concat(rawHttpLink);

const wsLink = new WebSocketLink({
  uri: `wss://${API_URL}`,
  options: {
    connectionParams: () => {
      const token = AsyncStorage.getItem('token');
      return { Authorization: token ? `Bearer ${token}` : '' };
    },
    lazy: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;

import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from 'apollo-link-context';

const httpAuthLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const rawHttpLink = new HttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_API_URL}`,
  credentials: 'same-origin',
});

const httpLink = httpAuthLink.concat(rawHttpLink);

const wsLink = () => {
  const token = localStorage.getItem('token');
  return process.browser
    ? new WebSocketLink({
        uri: `wss://${process.env.NEXT_PUBLIC_API_URL}`,
        options: {
          reconnect: true,
          connectionParams: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      })
    : null;
};

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink(),
      httpLink,
    )
  : httpLink;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;

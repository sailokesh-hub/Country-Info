import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', // Replace with your public API URL
  cache: new InMemoryCache(),
});

export default client;

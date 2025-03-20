import { ApolloClient, InMemoryCache } from '@apollo/client';

// 1. Create the connection configuration
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // API address
  cache: new InMemoryCache(), // Creates a memory-based cache
});

// 2. Make this available to the whole app
export default client;
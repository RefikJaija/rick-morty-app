import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';  // Remove "src/" from path
import SimpleList from '../components/SimpleList';  // Remove "src/" from path

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div style={{ padding: 20 }}>
        <h1>Rick and Morty Characters</h1>
        <br />
        <SimpleList />
      </div>
    </ApolloProvider>
  );
}

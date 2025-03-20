import { ApolloProvider } from '@apollo/client';
import { LanguageProvider } from '../context/LanguageContext';
import client from '../lib/apolloClient';
import AppLayout from '../components/Layout';

export default function App({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </LanguageProvider>
    </ApolloProvider>
  );
}
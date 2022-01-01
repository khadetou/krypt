import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import { TransactionProvider } from '@/context/TransactionContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransactionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TransactionProvider>
  );
}

export default MyApp

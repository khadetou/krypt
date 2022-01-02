import type { GetStaticProps, NextPage } from 'next';
import { Services, Transactions } from '../components';
const Home: NextPage = () => {

  return (
    < >
      <Services />
      <Transactions />
    </>
  )
}

export default Home



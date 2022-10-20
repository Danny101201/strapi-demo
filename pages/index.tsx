import type { GetServerSideProps, NextPage } from 'next';
import type { NextPageWithLayout } from './_app'
import Layout from 'components/Layout.component';
import { useFetchUser } from 'api/authContext';

const Home: NextPageWithLayout<{ user: string }> = ({ user }) => {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
Home.getLayout = (page) => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading} title={'home'}>
      {page}
    </Layout>
  )
}


export default Home



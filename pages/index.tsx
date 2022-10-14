import type { GetServerSideProps, NextPage } from 'next';
import type { NextPageWithLayout } from './_app'
import Layout from 'components/Layout.component';

const Home: NextPageWithLayout<{ user: string }> = ({ user }) => {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
Home.getLayout = (page) => {
  const { user } = page.props
  return (
    <Layout user={user}>
      {page}
    </Layout>
  )
}
Home.metaData = {
  title: 'Home'
}

export default Home

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {

  return {
    props: {
      user: 'Danny'
    }
  }

}

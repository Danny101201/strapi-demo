import type { GetServerSideProps, NextPage } from 'next';
import type { NextPageWithLayout } from './_app'
import Layout from 'components/Layout.component';
import { fetcher } from 'api';
import FilmsList from 'components/Films.component';

const Films: NextPageWithLayout<FilmPageProps> = ({ films }) => {
  return (
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter">
      <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
        Films
      </span>
      <FilmsList films={films} />
    </h1>
  )
}
Films.getLayout = (page) => {
  const { user } = page.props
  return (
    <Layout user={user}>
      {page}
    </Layout>
  )
}
Films.metaData = {
  title: 'Films'
}

export const getServerSideProps: GetServerSideProps<FilmPageProps> = async (context) => {
  const filmsResponse = await fetcher<FilmsType>(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films`)
  console.log(filmsResponse)
  if (filmsResponse.data === null) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      user: 'danny',
      films: filmsResponse
    }
  }
}
export default Films

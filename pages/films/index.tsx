import type { GetServerSideProps } from 'next';
import { useState } from 'react';
import type { NextPageWithLayout } from '../_app'
import Layout from 'components/Layout.component';
import { fetcher } from 'api';
import FilmsList from 'components/Films.component';
import useSWR from 'swr';
import { useFetchUser } from 'api/authContext';
const Films: NextPageWithLayout<FilmPageProps> = ({ films }) => {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const { data } = useSWR<FilmsType | undefined>(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${pageIndex}&pagination[pageSize]=5`, fetcher, {
    fallbackData: films
  })
  return (
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter">
      <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
        Films
      </span>
      <FilmsList films={data as FilmsType} />
      <div className="flex gap-5 text-[1.5rem] items-center justify-between">
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${pageIndex === 1 ? 'bg-gray-300' : 'bg-blue-400'
            }`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          {' '}
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-black text-white p-2 ${pageIndex === (data && data.meta.pagination.pageCount)
            ? 'bg-gray-300'
            : 'bg-blue-400'
            }`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${data && data.meta.pagination.pageCount
          }`}</span>
      </div>
    </h1>
  )
}
Films.getLayout = (page) => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} title={'films'}>
      {page}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<FilmPageProps> = async (context) => {
  const filmsResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=5`) as FilmsType

  if (filmsResponse.data === null) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      films: filmsResponse
    }
  }
}
export default Films

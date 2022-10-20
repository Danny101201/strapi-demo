import { fetcher } from 'api'
import { GetServerSideProps, NextApiRequest } from 'next'
import { NextPageWithLayout } from 'pages/_app'
import { ParsedUrlQuery } from 'querystring'
import Layout from 'components/Layout.component';
import { useFetchUser } from 'api/authContext';
import { getTokenFromLocalCookie, getUserFromLocalCookie, getTokenFromServerCookie } from 'utils/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import Router from 'next/router';

interface FilmProps {
  film: FilmData,
  jwt: string,
  slug: number
}
const Film: NextPageWithLayout<FilmProps> = ({ film, jwt, slug }) => {
  const { user, loading } = useFetchUser();
  const [review, setReview] = useState({
    value: ''
  })
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview({
      value: e.target.value
    })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {

      await fetcher<FilmsType>(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`
          },
          body: JSON.stringify({
            data: {
              review: review.value,
              reviewer: await getUserFromLocalCookie(),
              film: slug
            }
          })
        }
      )
      Router.reload()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          {film.attributes.title}
        </span>
      </h1>
      <p>
        Directed by{' '}
        <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          {film.attributes.director}
        </span>
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Plot
        </span>
      </h2>
      {user && (
        <>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
              Reviews
            </span>
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full text-sm px-3 py-2 text-gray-700 border border-2 border-teal-400 rounded-lg focus:outline-none"
                placeholder="Add your review"
                value={review.value}
                onChange={handleChange}
              ></textarea>
              <button
                className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                type="submit"
              >
                Add Review
              </button>
            </form>
          </h2>
          <ul>
            {film.attributes.reviews.data.length === 0 && (
              <span>No reviews yet</span>
            )}
            {film.attributes.reviews &&
              film.attributes.reviews.data.map((review) => {
                return (
                  <li key={review.id}>
                    <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                      {review.attributes.reviewer}
                    </span>{' '}
                    said &quot;{review.attributes.review}&quot;
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </>
  )
}
Film.getLayout = (page) => {
  const { film } = page.props
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user} loading={loading} title={film.attributes.title}>{page}</Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as ParsedUrlQuery
  const jwt = typeof window !== 'undefined' ? getTokenFromLocalCookie() : getTokenFromServerCookie(context.req as NextApiRequest)
  const filmResponse = await fetcher<FilmsType>(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films/${slug}?populate=*`,
    jwt
      ? {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
      : undefined
  )

  if (filmResponse.data === null) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      film: filmResponse.data,
      jwt: jwt || '',
      slug
    }
  }
}

export default Film
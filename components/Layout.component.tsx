// eslint-disable-next-line @next/next/no-document-import-in-page
import { UserProvider } from 'api/authContext';
import Head from 'next/head';
import React from 'react'
import Nav from './Nav.component'
interface LayoutProp {
  children: React.ReactElement
  title: string
  loading?: boolean
  user: any
}
function Layout({ user, loading = false, children, title }: LayoutProp) {
  return (
    <UserProvider value={{ user, loading }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav />
      <main className='px-4'>
        <div className='flex justify-center items-center bg-white mx-auto w-2/4 rounded-lg my-16 p16'>
          <div className='terxt-2xl font-medium'>{children}</div>
        </div>
      </main>
    </UserProvider>
  )
}

export default Layout
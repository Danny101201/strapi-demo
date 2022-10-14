import React from 'react'
import Nav from './Nav.component'
interface LayoutProp extends PageProps {
  children: React.ReactElement
}
function Layout({ children, user }: LayoutProp) {
  return (
    <>
      <Nav />
      <main className='px-4'>
        <div className='flex justify-center items-center bg-white mx-auto w-2/4 rounded-lg my-16 p16'>
          <div className='terxt-2xl font-medium'>{children}</div>
        </div>
      </main>
    </>
  )
}

export default Layout
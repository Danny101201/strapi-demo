import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import MetaData from 'components/metaData.component';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement<PageProps>) => ReactNode,
  metaData: MetaDataType
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const metaData = Component.metaData
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <>
      <MetaData {...metaData} />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp

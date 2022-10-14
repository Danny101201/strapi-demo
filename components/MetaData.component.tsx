import React from 'react'
import Head from 'next/head'

function MetaData({ title }: MetaDataType) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default MetaData
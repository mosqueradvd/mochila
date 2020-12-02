import React from 'react'
import Link from 'next/link'
import Layout from 'components/Layout'
export { getServerSideProps } from 'lib/ssr'

const Organizations = () => {
  return (
    <Layout pageTitle='Organizaciones'>
      <h1>Organizaciones</h1>
      <Link href='/organizations/new'>Nueva</Link>
    </Layout>
  )
}

export default Organizations

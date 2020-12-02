import React from 'react'
import Layout from 'components/Layout'
export { getServerSideProps } from 'lib/ssr'

const Organization = () => {
  return (
    <Layout pageTitle='Organizacion'>
      <h1>Organización</h1>
    </Layout>
  )
}

export default Organization

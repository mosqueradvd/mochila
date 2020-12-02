import React from 'react'
import Layout from 'components/Layout'
export { getServerSideProps } from 'lib/ssr'

const Organization = () => {
  return (
    <Layout pageTitle='Nueva Organizacion'>
      <h1>Nueva Organización</h1>
    </Layout>
  )
}

export default Organization

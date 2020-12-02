import React from 'react'
import Layout from 'components/Layout'
export { getServerSideProps } from 'lib/ssr'

const Home = () => {
  return (
    <Layout>
      <div>
        <p>Hello</p>
      </div>
    </Layout>
  )
}

export default Home

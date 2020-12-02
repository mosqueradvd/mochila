import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from './Header'

const DEFAULT_TITLE = 'Mochila Proyectos'

const Layout = ({ pageTitle, user, children }) => (
  <>
    <Head>
      <title>{pageTitle || DEFAULT_TITLE}</title>
    </Head>
    <Header user={user} />
    <main>
      <div className='container'>{children}</div>
    </main>
  </>
)

Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node,
  user: PropTypes.object
}

export default Layout

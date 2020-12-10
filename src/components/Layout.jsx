import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header'
import theme from '../theme'

const DEFAULT_TITLE = 'Mochila Proyectos'

const Layout = ({ pageTitle, user, children }) => (
  <>
    <Head>
      <title>{pageTitle || DEFAULT_TITLE}</title>
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={user} />
      <main>
        <div className='container'>{children}</div>
      </main>
    </ThemeProvider>
  </>
)

Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node,
  user: PropTypes.object
}

export default Layout

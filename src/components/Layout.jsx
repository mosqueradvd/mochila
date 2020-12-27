import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Drawers from './Drawers'
import { ThemeProvider } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/'
import Hidden from '@material-ui/core/Hidden'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header'
import theme from '../theme'

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(10),
    textAlign: 'center'
  },
  toolbar: theme.mixins.toolbar,
  mainTitle: {
    marginBottom: '1.5em'
  }
}))
const DEFAULT_TITLE = 'Mochila Proyectos'

const Layout = ({ pageTitle, user, children }) => {
  const classes = styles()
  const [open, setOpen] = useState(false)
  const actionOpen = () => {
    setOpen(!open)
  }
  return (

    <div className={classes.root}>
      <Head>
        <title>{pageTitle || DEFAULT_TITLE}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header user={user} />
        <Hidden xsDown>
          <Drawers variant='permanent' open />
        </Hidden>
        <Hidden smUp>
          <Drawers variant='temporary' open={open} onClose={actionOpen} />
        </Hidden>
        <main>
          <div className={classes.toolbar} />
          <div className='container'>{children}</div>
        </main>
      </ThemeProvider>
    </div>
  )
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node,
  user: PropTypes.object
}

export default Layout

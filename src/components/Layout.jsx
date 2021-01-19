import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Drawers from './Drawers'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/'
import Hidden from '@material-ui/core/Hidden'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header'
import { esES } from '@material-ui/core/locale'
import useUser from 'hooks/useUser'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#372B59'
    },
    secondary: {
      main: '#21A1EC'
    },
    error: {
      main: '#972022'
    },
    warning: {
      main: '#E7992D'
    },
    success: {
      main: '#287833'
    }
  }
}, esES)

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(5),
    textAlign: 'center'
  },
  toolbar: theme.mixins.toolbar
}))
const DEFAULT_TITLE = 'Mochila Proyectos'

const Layout = ({ pageTitle, children }) => {
  const classes = styles()
  const user = useUser()
  const [open, setOpen] = useState(false)
  const actionOpen = () => {
    setOpen(!open)
  }

  if (user.isAuthenticated && user.userStatus) {
    return (

      <div className={classes.root}>
        <Head>
          <title>{pageTitle || DEFAULT_TITLE}</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <>
            <Header user={user} actionOpen={actionOpen} />
            <Hidden xsDown>
              <Drawers variant='permanent' open />
            </Hidden>
            <Hidden smUp>
              <Drawers variant='temporary' open={open} onClose={actionOpen} />
            </Hidden>
          </>

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className='container'>{children}</div>
          </main>
        </ThemeProvider>
      </div>
    )
  } else {
    return (

      <div className={classes.root}>
        <Head>
          <title>{pageTitle || DEFAULT_TITLE}</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className='container'>{children}</div>
          </main>
        </ThemeProvider>
      </div>
    )
  }
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node
}

export default Layout

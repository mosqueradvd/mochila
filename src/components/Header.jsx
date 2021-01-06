import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '@dux/loginSlice'

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  title: {
    flexGrow: 1
  },
  subtitle: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }

}))

const Header = ({ actionOpen }) => {
  const user = useSelector(getCurrentUser)
  const classes = useStyles()
  return (
    <header>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label='Menu'
            className={classes.menuButton}
            onClick={() => actionOpen()}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' color='initial' className={classes.title}>
            Banco de proyectos
          </Typography>
          <ul>
            {user.isAuthenticated
              ? (
                <>
                  <Link href='/api/logout'>
                    <Button variant='contained' color='secondary'>
                      Cerrar sesion
                    </Button>
                  </Link>
                </>
                )
              : (
                  null
                )}
          </ul>
        </Toolbar>
      </AppBar>

    </header>
  )
}

Header.propTypes = {
  actionOpen: PropTypes.func.isRequired
}

export default Header

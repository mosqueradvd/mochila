import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '@dux/loginSlice'

const drawerWidth = 240

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
  },
  offset: theme.mixins.toolbar
}))

const Header = ({ actionOpen }) => {
  const user = useSelector(getCurrentUser)
  const classes = useStyles()
  return (
    <header>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <MenuIcon
            aria-label='Menu'
            className={classes.menuButton}
            onClick={() => actionOpen()}
          />
          <Typography variant='h6' color='initial' className={classes.title}>
            Banco de proyectos
          </Typography>
          <ul>
            <li>
              <Link href='/'>
                <a>Inicio</a>
              </Link>
            </li>
            {user.isAuthenticated
              ? (
                <>
                  <li>
                    <Link href='/organizations'> Organizaciones</Link>
                  </li>
                  <li>
                    <Link href='/projects'> Projects</Link>
                  </li>
                  <li>
                    <Link href='/users'> Users</Link>
                  </li>
                  <li>
                    <Link href='/profile'>{`Perfíl (${user.name})`}</Link>
                  </li>
                  <li>
                    <a href='/api/logout'>Salir</a>
                  </li>
                </>
                )
              : (
                <li>
                  <Link href='/api/login'>Ingresar</Link>
                </li>
                )}
          </ul>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </header>
  )
}

Header.propTypes = {
  actionOpen: PropTypes.func.isRequired
}

export default Header

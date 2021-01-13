import PropTypes from 'prop-types'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import MenuAdmin from './MenuAdmin'
import MenuManager from './MenuManager'
import MenuOperator from './MenuOperator'
import { isAdmin, isManager, isOperator } from 'lib/helpers'
import useUser from 'hooks/useUser'

const drawerWidth = 250

const styles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}))

const Drawers = ({ variant, open, onClose }) => {
  const classes = styles()
  const { userRole } = useUser()

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor='left'
      variant={variant}
      open={open}
      onClose={onClose || null}
    >
      <div className={classes.toolbar} />
      <Divider />
      {isAdmin(userRole) && <MenuAdmin />}
      {(isAdmin(userRole) || isManager(userRole)) && <MenuManager />}
      {(isAdmin(userRole) || isManager(userRole) || isOperator(userRole)) && <MenuOperator />}
    </Drawer>
  )
}

Drawers.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  variant: PropTypes.string
}

export default Drawers

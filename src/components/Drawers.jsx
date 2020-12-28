import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import MenuAdmin from './MenuAdmin'

const drawerWidth = 240

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
      <MenuAdmin />
    </Drawer>
  )
}

export default Drawers
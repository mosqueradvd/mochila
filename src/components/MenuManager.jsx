import React from 'react'
import Link from 'next/link'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'

import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import WallpaperIcon from '@material-ui/icons/Wallpaper'

const MenuManager = () => {
  return (
    <List component='nav'>
      <Link href='/manager'>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Inicio</ListItemText>
        </ListItem>
      </Link>
      <Link href='/manager/user'>
        <ListItem button>
          <ListItemIcon>
            <PeopleSharpIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Usuarios</ListItemText>
        </ListItem>
      </Link>
      <Link href='/manager/project'>
        <ListItem button>
          <ListItemIcon>
            <FormatListNumberedIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Proyectos</ListItemText>
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <WallpaperIcon color='primary' />
        </ListItemIcon>
        <ListItemText>Subir hoja membrete</ListItemText>
      </ListItem>
    </List>
  )
}

export default MenuManager

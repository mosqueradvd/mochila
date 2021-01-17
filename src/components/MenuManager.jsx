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
    </List>
  )
}

export default MenuManager

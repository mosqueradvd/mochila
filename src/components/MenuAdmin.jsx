import React from 'react'
import Link from 'next/link'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import BorderColorIcon from '@material-ui/icons/BorderColor'

const MenuAdmin = () => {
  return (
    <List component='nav'>
      <Link href='/admin'>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Inicio</ListItemText>
        </ListItem>
      </Link>
      <Link href='/admin/organization'>
        <ListItem button>
          <ListItemIcon>
            <BorderColorIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Organizaciones</ListItemText>
        </ListItem>
      </Link>
      <Link href='/admin/user/'>
        <ListItem button>
          <ListItemIcon>
            <PeopleSharpIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Usuarios</ListItemText>
        </ListItem>
      </Link>
      <Divider />
    </List>
  )
}

export default MenuAdmin

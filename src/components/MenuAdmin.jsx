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
import ListIcon from '@material-ui/icons/List'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import HowToRegSharpIcon from '@material-ui/icons/HowToRegSharp'
import LockSharpIcon from '@material-ui/icons/LockSharp'
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
          <ListItemText>Organizaciónes</ListItemText>
        </ListItem>
      </Link>
      <Link href='/admin/user/'>
        <ListItem button>
          <ListItemIcon>
            <ListIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Listar usuarios</ListItemText>
        </ListItem>
      </Link>
      <Link href='/admin/user/edit'>
        <ListItem button>
          <ListItemIcon>
            <PeopleSharpIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Modificar usuarios</ListItemText>
        </ListItem>
      </Link>
      <Link href='/admin/user/enable-disable'>
        <ListItem button>
          <ListItemIcon>
            <HowToRegSharpIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Habilitar/Deshabilitar usuarios</ListItemText>
        </ListItem>
      </Link>

      <Link href='/api/logout'>
        <ListItem button>
          <ListItemIcon>
            <LockSharpIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </ListItem>
      </Link>

      <Divider />
    </List>
  )
}

export default MenuAdmin

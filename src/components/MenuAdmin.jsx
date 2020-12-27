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
import CreateIcon from '@material-ui/icons/Create'
import ListIcon from '@material-ui/icons/List'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import HowToRegSharpIcon from '@material-ui/icons/HowToRegSharp'
import LockSharpIcon from '@material-ui/icons/LockSharp'
import BorderColorIcon from '@material-ui/icons/BorderColor'

const MenuAdmin = () => {
  return (
    <List component='nav'>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>Inicio</ListItemText>
      </ListItem>
      <Link href='/users'>
        <ListItem button>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText>Crear organización</ListItemText>
        </ListItem>
      </Link>

      <ListItem button href='/organizations'>
        <ListItemIcon>
          <BorderColorIcon />
        </ListItemIcon>
        <ListItemText>Modificar organización</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText>Listar usuarios</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleSharpIcon />
        </ListItemIcon>
        <ListItemText>Modificar usuarios</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <HowToRegSharpIcon />
        </ListItemIcon>
        <ListItemText>Habilitar/Deshabilitar usuarios</ListItemText>
      </ListItem>
      <Link href='/api/logout'>
        <ListItem button>
          <ListItemIcon>
            <LockSharpIcon />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </ListItem>
      </Link>

      <Divider />
    </List>
  )
}

export default MenuAdmin

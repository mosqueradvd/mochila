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
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import LockSharpIcon from '@material-ui/icons/LockSharp'

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
      <Link href='/manager/project/new'>
        <ListItem button>
          <ListItemIcon>
            <FolderOpenIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Crear proyecto</ListItemText>
        </ListItem>
      </Link>
      <Link href='/manager/project'>
        <ListItem button>
          <ListItemIcon>
            <FormatListNumberedIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Listar proyecto</ListItemText>
        </ListItem>
      </Link>

      <Link href='/manager/project/edit'>
        <ListItem button>
          <ListItemIcon>
            <MenuBookIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Modificar proyecto</ListItemText>
        </ListItem>
      </Link>
      <Link href='/manager/project/enable-disable'>
        <ListItem button>
          <ListItemIcon>
            <LibraryAddCheckIcon color='primary' />
          </ListItemIcon>
          <ListItemText>Habilitar/deshabilitar</ListItemText>
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <CardMembershipIcon color='primary' />
        </ListItemIcon>
        <ListItemText>Generar certificado</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <WallpaperIcon color='primary' />
        </ListItemIcon>
        <ListItemText>Subir hoja membrete</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LockSharpIcon color='primary' />
        </ListItemIcon>
        <ListItemText>Cerrar sesión</ListItemText>
      </ListItem>
    </List>
  )
}

export default MenuManager

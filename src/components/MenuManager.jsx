import React from 'react'
import Link from 'next/link'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create'
import ListIcon from '@material-ui/icons/List'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import HowToRegSharpIcon from '@material-ui/icons/HowToRegSharp'
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
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Inicio</ListItemText>
        </ListItem>
      </Link>
      <Link href='/manager/user/new'>
        <ListItem button>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText>Crear usuarios</ListItemText>
        </ListItem>
      </Link>
      <Link href='/manager/user'>
        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText>Listar usuarios</ListItemText>
        </ListItem>
      </Link>

      <ListItem button>
        <ListItemIcon>
          <PeopleSharpIcon />
        </ListItemIcon>
        <ListItemText>Modificar usuarios</ListItemText>
      </ListItem>
      <Link href='/manager/user/enable-disable'>
        <ListItem button>
          <ListItemIcon>
            <HowToRegSharpIcon />
          </ListItemIcon>
          <ListItemText>Habilitar/Deshabilitar usuarios</ListItemText>
        </ListItem>
      </Link>

      <Divider />
      <Typography variant='h6' color='primary'>
        Proyectos
      </Typography>
      <Link href='/manager/project/new'>
        <ListItem button>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText>Crear proyecto</ListItemText>
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText>Listar proyecto</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText>Modificar proyecto</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LibraryAddCheckIcon />
        </ListItemIcon>
        <ListItemText>Habilitar/deshabilitar</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CardMembershipIcon />
        </ListItemIcon>
        <ListItemText>Generar certificado</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <WallpaperIcon />
        </ListItemIcon>
        <ListItemText>Subir hoja membrete</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LockSharpIcon />
        </ListItemIcon>
        <ListItemText>Cerrar sesión</ListItemText>
      </ListItem>
    </List>
  )
}

export default MenuManager

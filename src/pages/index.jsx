import React from 'react'
import Layout from '@components/Layout'
import { makeStyles } from '@material-ui/core/styles'
import Homepage from '../static/homepage'
import Link from 'next/link'
import {
  Container,
  Grid,
  Card,
  Typography,
  List,
  ListItemAvatar,
  Avatar,
  ListItem,
  Button,
  ListItemText
} from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'

export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 340
    }
  },
  container: {

    marginBottom: theme.spacing(1),
    padding: theme.spacing(2)
  },

  typography: {
    paddingTop: theme.spacing(5)
  },
  list: {
    width: '100%',
    maxWidth: 700,
    marginTop: theme.spacing(2)

  },
  margintop: {
    marginTop: theme.spacing(2)
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Container className={classes.container}>
        <Typography variant='h4' color='primary'>
          Mochila SW
        </Typography>
        <Grid container spacing={2} className={classes.margintop}>
          <Grid item xs={12} sm={6} md={6}>
            <Card className={classes.root}>
              <Homepage />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography gutterBottom variant='h5' component='h2' className={classes.typography}>
              Control total de la infomación
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              La plataforma le permite administrar la información de los proyectos formulados por la institucion
              u organización, dandole acceso a esta información desde cualquier parte en que se encuentre solo con
              una conexión a internet usted esta en la capacidad de buscar, ingresar o generar un certifdicado
            </Typography>
            <div>
              <List className={classes.list}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon color='primary' />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Gestiona usuarios' />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon color='primary' />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Crear proyectos' />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CardMembershipIcon color='primary' />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Generar certificados' />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImportantDevicesIcon color='primary' />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Acceso desde su pc o dispositivo móvil' />
                </ListItem>
              </List>
            </div>
            <div>
              <Link href='/api/login'>
                <Button variant='outlined' color='primary' href='#outlined-buttons'>
                  Ingresar
                </Button>
              </Link>

            </div>
          </Grid>
        </Grid>
      </Container>

    </Layout>
  )
}

export default Home

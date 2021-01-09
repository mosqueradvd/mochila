import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Card, Typography, Grid, Box, Container, Button
} from '@material-ui/core'
import { fetchUserById } from '@dux/usersSlice'
import {
  makeStyles
} from '@material-ui/core/styles'
import Layout from '@components/Layout'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'initial',
    padding: theme.spacing(3)
  },
  typography: {
    marginBottom: theme.spacing(2)
  },
  box: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const ComponentUserInfo = () => {
  const router = useRouter()
  const { id } = router.query

  const isLoading = useSelector(state => state.users.isLoading)
  const user = useSelector(state => state.users.current)

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserById(id))
  }, [dispatch, id])
  if (isLoading) {
    return (
      <div className={classes.skeleton}>
        <Skeleton animation={false} width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' variant='rect' width={350} height={200} />
      </div>
    )
  }
  return (
    <Layout pageTitle='información del usuario'>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            gutterBottom
            className={classes.tipography}
          >
            Información del usuario
          </Typography>
          <Link href={`/admin/user/edit/${id}`}>
            <Button
              variant='contained'
              color='primary'
            >
              Editar
            </Button>
          </Link>
        </Box>
        <Card raised className={classes.card}>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre
              </Typography>
              <Typography color='initial'>
                {user?.userName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Organización
              </Typography>
              <Typography color='initial'>
                {user?.userOrganization}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Tipo de Documento
              </Typography>
              <Typography color='initial'>
                {user?.userIdentificationType}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Número
              </Typography>
              <Typography color='initial'>
                {user?.userIdentification}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Correo Electrónico
              </Typography>
              <Typography color='initial'>
                {user?.userEmail}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Celular
              </Typography>
              <Typography color='initial'>
                {user?.userPhone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Estado
              </Typography>
              <Typography color='initial'>
                {user?.userStatus === true ? 'Activo' : 'Inactivo'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Rol
              </Typography>
              <Typography color='initial'>
                {user?.userRol}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Layout>
  )
}

export default ComponentUserInfo

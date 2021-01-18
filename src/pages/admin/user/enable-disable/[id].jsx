import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchUserById, updateUserStatus } from 'dux/usersSlice'
import Layout from 'components/Layout'
import {
  Card,
  Typography,
  Grid,
  Box,
  Container,
  Button
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import { getIdentificationTypeById, getRolesTypeById } from 'lib/helpers'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: 'initial',
    padding: theme.spacing(3)
  },
  typography: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em'
    },
    display: 'flex',
    justifyContent: 'left'
  },
  box: {
    marginBottom: theme.spacing(2)
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  button: {
    marginTop: '2.5em',
    display: 'flex',
    justifyContent: 'center'
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const DisableEnableUser = () => {
  const router = useRouter()
  const { id } = router.query

  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.users.isLoading)
  const user = useSelector(state => state.users.current)

  useEffect(() => {
    dispatch(fetchUserById(id))
  }, [dispatch, id])

  const handleState = () => {
    const userStatus = !(user?.userStatus || false)
    dispatch(
      updateUserStatus({
        id,
        userStatus
      })
    ).then(() => {
      router.push('/admin')
    })
  }

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
    <Layout pageTitle='habilitar - deshabilitar usuario'>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            gutterBottom
            className={classes.typography}
          >
            Habilitar o deshabilitar un usuario
          </Typography>
        </Box>
        <Card raised className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
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

            <Grid item xs={6} sm={6} md={6}>
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

            <Grid item xs={6} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Tipo de Documento
              </Typography>
              <Typography color='initial'>
                {getIdentificationTypeById(user?.userIdentificationType)?.value}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
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

            <Grid item xs={6} sm={6} md={6}>
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

            <Grid item xs={6} sm={6} md={6}>
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

            <Grid item xs={6} sm={6} md={6}>
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

            <Grid item xs={6} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Rol
              </Typography>
              <Typography color='initial'>
                {getRolesTypeById(user?.userRole)?.value}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.button}>
            <Button
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
              onClick={handleState}
            >
              {user?.userStatus === true ? 'Deshabilitar' : 'habilitar'}
            </Button>
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default DisableEnableUser

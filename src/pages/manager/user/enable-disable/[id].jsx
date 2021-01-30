import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Alert from '@material-ui/lab/Alert'
import { fetchUserById, updateUserStatus } from 'dux/usersSlice'
import Layout from 'components/Layout'
import {
  Card,
  Typography,
  Grid,
  Box,
  CssBaseline,
  Container,
  Button
} from '@material-ui/core'
import {
  makeStyles
} from '@material-ui/core/styles'
import Animations from 'components/Animations'
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
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  button: {
    marginTop: '2.5em'
  }
}))

const DisableEnableUser = () => {
  const router = useRouter()
  const { id } = router.query

  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.users.isLoading)
  const user = useSelector(state => state.users.current)

  const [alert, setAlert] = useState(false)
  const [buttonsend, setButtonsend] = useState(false)

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
      setButtonsend(true)
      setAlert(!alert)
    })
      .then(() => {
        setTimeout(function () { router.push('/manager') }, 2000)
      })
  }

  if (isLoading) {
    return (
      <Animations />
    )
  }
  return (
    <Layout pageTitle='habilitar - deshabilitar usuario'>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <CssBaseline />
          {alert === true ? <Alert severity='success'>Usuario modificado con éxito!</Alert> : null}
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
              disabled={buttonsend}
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

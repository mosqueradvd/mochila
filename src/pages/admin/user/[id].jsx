import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  Card, Typography, Grid, Box, Container,
  CircularProgress
} from '@material-ui/core'
import { fetchUserById } from '@dux/usersSlice'
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles'
import Layout from '@components/Layout'

const theme = createMuiTheme()

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    textAlign: 'initial',
    padding: theme.spacing(3)
  },
  typography: {
    marginBottom: theme.spacing(2)
  },
  userInfo: {
    color: '#818181'
  },
  fixmargin: {
    marginRight: '20px'
  },
  box: {
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#cfe8fc',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
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
    return <CircularProgress />
  }
  return (
    <Layout pageTitle='información del usuarios'>
      <Container className={classes.container}>
        <div className={classes.root}>
          <Card raised className={classes.card}>
            <Box className={classes.box}>
              <Typography
                variant='h4'
                color='primary'
                gutterBottom
                className={classes.tipography}
              >
                Información del usuario
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <ThemeProvider theme={theme}>
                  <Typography
                    color='primary'
                    gutterBottom
                    className={classes.typography}
                  >
                    Nombre
                  </Typography>
                  <Typography color='initial' className={classes.userInfo}>
                    {user?.userName}
                  </Typography>
                </ThemeProvider>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Organización
                </Typography>
                <Typography color='initial' className={classes.userInfo}>
                  Organizacion
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
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userIdentificationType}
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
                <Typography color='initial' className={classes.userInfo}>
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
                <Typography color='initial' className={classes.userInfo}>
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
                <Typography color='initial' className={classes.userInfo}>
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
                <Typography color='initial' className={classes.userInfo}>
                  Estado activo
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
                <Typography color='initial' className={classes.userInfo}>
                  {user?.userRol}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

export default ComponentUserInfo

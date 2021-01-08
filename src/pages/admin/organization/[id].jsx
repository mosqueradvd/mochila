import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  Typography,
  Grid,
  Box,
  Container
} from '@material-ui/core'
import { fetchOrganizationById } from '@dux/organizationsSlice'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@components/Layout'
import Skeleton from '@material-ui/lab/Skeleton'

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
  fixmargin: {
    marginRight: '20px'
  },
  box: {
    marginBottom: theme.spacing(5),
    textAlign: 'center'
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

const Info = () => {
  const router = useRouter()
  const { id } = router.query
  const isLoading = useSelector(state => state.organizations.isLoading)
  const organization = useSelector(state => state.organizations.current)
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrganizationById(id))
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
                Información de la organización
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Nombre de la Organización
                </Typography>
                <Typography color='initial'>
                  {organization?.name}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  NIT o Documento
                </Typography>
                <Typography color='initial'>
                  {organization?.identificationNumber}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Nombre del Representante Legal
                </Typography>
                <Typography color='initial'>
                  {organization?.legalRepresentative}
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
                  {organization?.identificationType}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Número de Documento
                </Typography>
                <Typography color='initial'>
                  {organization?.identification}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Número de Celular
                </Typography>
                <Typography color='initial'>
                  {organization?.phone}
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
                  {organization?.email}
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Departamento
                </Typography>
                <Typography color='initial'>
                  {organization?.departament}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Municipio
                </Typography>
                <Typography color='initial'>
                  {organization?.city}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Resguardo y/o Cabildo
                </Typography>
                <Typography color='initial'>
                  {organization?.community}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

export default Info

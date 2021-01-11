import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  Typography,
  Grid,
  Box,
  Container,
  Button
} from '@material-ui/core'
import { fetchOrganizationById } from '@dux/organizationsSlice'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@components/Layout'
import Skeleton from '@material-ui/lab/Skeleton'
import { getIdentificationTypeById } from 'lib/helpers'
export { getServerSideProps } from 'lib/ssr'

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
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            gutterBottom
            className={classes.tipography}
          >
            Información de la organización
          </Typography>
          <Link href={`/admin/organization/edit/${id}`}>
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
                {getIdentificationTypeById(organization?.identificationType)?.value}
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
      </Container>
    </Layout>
  )
}

export default Info

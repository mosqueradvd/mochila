import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { createOrganization } from 'dux/organizationsSlice'
import {
  CircularProgress,
  TextField,
  Button,
  Container,
  Box,
  Card,
  Grid,
  Typography
} from '@material-ui/core'
import { Info as InfoIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'initial'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  formControl: {
    minWidth: '100%',
    marginTop: theme.spacing(1)
  },
  selectInput: {
    minWidth: 100
  },
  titles: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1)
  },
  adminData: {
    display: 'flex',
    flexGrow: 1
  },
  adminButton: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1)
  },
  TextField: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: '2.5em',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: '#cfe8fc',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: theme.spacing(2)
  }
}))

const Organization = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm()
  const classes = useStyles()

  const isLoading = useSelector(state => state.organizations.isLoading)

  // TODO: Handle backend errors and response status to redirect after
  // success create
  const onSubmit = data => {
    dispatch(createOrganization(data))
    router.push('/organizations')
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Layout pageTitle='Nueva Organizacion'>
      <Container className={classes.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' justifyContent='center' className={classes.box}>
            <Typography variant='h4' color='primary'>
              Registrar organización
            </Typography>
          </Box>
          <div className={classes.root}>
            <Card raised className={classes.card}>
              <Grid container spacing={2}>
                <div className={classes.titles}>
                  <Typography
                    color='primary'
                    component='h1'
                    variant='h5'
                    gutterBottom
                  >
                    Datos de la Organización
                  </Typography>
                </div>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='name'
                    id='name'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    label='Nombre de la Organización'
                    variant='outlined'
                    fullWidth
                  />
                  {errors.nombre && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <div className={classes.button}>
                <Button
                  color='primary'
                  variant='contained'
                  fullWidth
                  type='submit'
                >
                  Guardar
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </Container>
    </Layout>
  )
}

export default Organization

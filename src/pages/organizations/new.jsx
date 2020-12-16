import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { IDENTIFICATION_TYPES, LOCATION } from 'lib/constans'
import { createOrganization } from 'dux/organizationsSlice'
import {
  CircularProgress,
  TextField,
  Button,
  Container,
  Box,
  Card,
  Grid,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem
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
  const { register, handleSubmit, control, errors, getValues } = useForm()
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  const docTypes = IDENTIFICATION_TYPES

  const labelWidthDept = labelWidth - 38
  const labelWidthTown = labelWidth - 70
  const isLoading = useSelector(state => state.organizations.isLoading)

  const departments = LOCATION
  const [departamentId, setDepartamentId] = useState('')
  function onDepartamentChanged () {
    const getvalueDep = getValues('departament')

    setDepartamentId(getvalueDep.id_departamento)
  }

  // TODO: Handle backend errors and response status to redirect after
  // success create
  const onSubmit = data => {
    // console.log('DATA', data)
    const { departamento: departament } = data.departament
    const { value: identificationType } = data.identificationType
    const { value: identificationTypeUSer } = data.identificationTypeUser

    const {
      name, identificationNumber, legalRepresentative, identification, phone, email,
      city, community, namesUser, identificationUser, phoneUser, emailUser, passwordUser
    } = data

    console.log(name, identificationNumber, legalRepresentative, identification, phone, email, departament,
      city, community, namesUser, identificationTypeUSer, identificationUser, phoneUser, emailUser, passwordUser
    )
    dispatch(createOrganization({
      name,
      identificationNumber,
      legalRepresentative,
      identificationType,
      identification,
      phone,
      email,
      departament,
      city,
      community
    }))
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
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='identificationNumber'
                    id='identificationNumber'
                    inputRef={register({ required: true })}
                    className={classes.TextField}
                    label='NIT o Documento'
                    variant='outlined'
                    fullWidth
                  />
                  {errors.identificationNumber && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='legalRepresentative'
                    className={classes.TextField}
                    id='legalRepresentative'
                    label='Nombre del Representante Legal'
                    inputRef={register({ required: true })}
                    variant='outlined'
                    fullWidth
                  />
                  {errors.legalRepresentative && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl className={classes.formControl} variant='outlined'>
                    <InputLabel ref={inputLabel} id='identificationType'>
                      Tipo de Documento
                    </InputLabel>
                    <Controller
                      as={
                        <Select labelWidth={labelWidth}>
                          {docTypes.map((doc, index) => {
                            return (
                              <MenuItem key={index} value={doc}>
                                {doc.value}
                              </MenuItem>
                            )
                          })}
                        </Select>
                    }
                      name='identificationType'
                      id='identificationType'
                      variant='outlined'
                      className={classes.selectInput}
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    {errors.identificationType && (
                      <Typography variant='caption' color='error'>
                        <InfoIcon color='error' fontSize='small' />
                        Campo obligatorio
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='identification'
                    className={classes.TextField}
                    id='identification'
                    label='Número de Documento'
                    variant='outlined'
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                  {errors.identification && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='phone'
                    className={classes.TextField}
                    id='phone'
                    label='Número de Celular'
                    variant='outlined'
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                  {errors.phone && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='email'
                    className={classes.TextField}
                    id='email'
                    label='Correo Electrónico'
                    variant='outlined'
                    fullWidth
                    inputRef={register({
                      required: 'Campo obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Formato de correo inválido'
                      }
                    })}
                  />
                  {errors.email && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.email.message}
                    </Typography>
                  )}
                  {errors.email === ' ' && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.email.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl className={classes.formControl} variant='outlined'>
                    <InputLabel ref={inputLabel} id='departament'>
                      Departamento
                    </InputLabel>
                    <Controller
                      as={
                        <Select shrink='true' labelWidth={labelWidthDept}>
                          {departments.map((dept, index) => {
                            return (
                              <MenuItem key={index} value={dept}>
                                {dept.departamento}
                              </MenuItem>
                            )
                          })}
                        </Select>
                    }
                      name='departament'
                      id='departament'
                      variant='outlined'
                      className={classes.selectInput}
                      control={control}
                      defaultValue=''
                      rules={{ required: true }}
                      onClick={onDepartamentChanged}
                    />
                    {errors.departament && (
                      <Typography variant='caption' color='error'>
                        <InfoIcon color='error' fontSize='small' />
                        Campo obligatorio
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl className={classes.formControl} variant='outlined'>
                    <InputLabel ref={inputLabel} id='city'>
                      Municipio
                    </InputLabel>
                    <Controller
                      as={
                        <Select labelWidth={labelWidthTown}>
                          {departments
                            .filter(
                              (departament) =>
                                departament.id_departamento === Number(departamentId)
                            )[0]
                            .ciudades.map((ciudad, index) => {
                              return (
                                <MenuItem key={index} value={ciudad}>
                                  {ciudad}
                                </MenuItem>
                              )
                            })}
                        </Select>
                    }
                      name='city'
                      id='city'
                      variant='outlined'
                      rules={{ required: true }}
                      className={classes.selectInput}
                      control={control}
                      defaultValue=''
                    />
                    {errors.city && (
                      <Typography variant='caption' color='error'>
                        <InfoIcon color='error' fontSize='small' />
                        Campo obligatorio
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='community'
                    id='community'
                    className={classes.TextField}
                    label='Resguardo y/o Cabildo'
                    variant='outlined'
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                  {errors.community && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>

                <Grid container spacing={2}>
                  <div className={classes.adminData}>
                    <div className={classes.titles}>
                      <Typography
                        color='primary'
                        component='h1'
                        variant='h5'
                        gutterBottom
                      >
                        Datos del Administrador
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='namesUser'
                    id='namesUser'
                    label='Nombre del Administrador'
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                  {errors.namesUser && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl className={classes.formControl} variant='outlined'>
                    <InputLabel ref={inputLabel} id='identificationTypeUser'>
                      Tipo de Documento
                    </InputLabel>
                    <Controller
                      as={
                        <Select labelWidth={labelWidth}>
                          {docTypes.map((doc, index) => {
                            return (
                              <MenuItem key={index} value={doc}>
                                {doc.value}
                              </MenuItem>
                            )
                          })}
                        </Select>
                    }
                      name='identificationTypeUser'
                      id='identificationTypeUser'
                      variant='outlined'
                      className={classes.selectInput}
                      control={control}
                      rules={{ required: true }}
                      defaultValue=''
                    />
                    {errors.identificationTypeUser && (
                      <Typography variant='caption' color='error'>
                        <InfoIcon color='error' fontSize='small' />
                        Campo obligatorio
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='identificationUser'
                    id='identificationUser'
                    label='Número de Documento'
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                  {errors.identificationUser && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='phoneUser'
                    id='phoneUser'
                    label='Número de celular'
                    className={classes.TextField}
                    variant='outlined'
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                  {errors.phoneUser && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    className={classes.TextField}
                    name='emailUser'
                    id='emailUser'
                    label='Correo electrónico'
                    variant='outlined'
                    inputRef={register({
                      required: 'Campo obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Formato de correo inválido'
                      }
                    })}
                    fullWidth
                  />
                  {errors.emailUser && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.emailUser.message}
                    </Typography>
                  )}
                  {errors.emailUser === ' ' && (
                    <Typography
                      variant='caption'
                      color='error'
                      className={classes.errorField}
                    >
                      <InfoIcon
                        color='error'
                        fontSize='small'
                        className={classes.errorIcon}
                      />
                      {errors.emailUser.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    className={classes.TextField}
                    name='passwordUser'
                    label='Contraseña'
                    id='passwordUser'
                    type='password'
                    variant='outlined'
                    fullWidth
                    inputRef={register({ required: true })}
                  />
                  {errors.passwordUser && (
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

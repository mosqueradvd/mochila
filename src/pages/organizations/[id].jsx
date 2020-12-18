import React, { useState, useRef, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import { IDENTIFICATION_TYPES, LOCATION } from 'lib/constans'
import { fetchOrganizationById, updateOrganization } from 'dux/organizationsSlice'
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
  const router = useRouter()
  const { id } = router.query
  const { register, handleSubmit, control, errors, getValues } = useForm()
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.organizations.isLoading)
  const organization = useSelector(state => state.organizations.current)

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  const docTypes = IDENTIFICATION_TYPES

  const labelWidthDept = labelWidth - 38
  const labelWidthTown = labelWidth - 70

  const departments = LOCATION
  const [departamentId, setDepartamentId] = useState('')
  function onDepartamentChanged () {
    const getvalueDep = getValues('departament')

    setDepartamentId(getvalueDep.id_departamento)
  }

  useEffect(() => {
    dispatch(fetchOrganizationById(id))
  }, [dispatch, id])

  // TODO: Handle backend errors and response status to redirect after
  // success create
  const onSubmit = data => {
    const { departamento: departament } = data.departament
    const { value: identificationType } = data.identificationType

    const {
      name, identificationNumber, legalRepresentative, identification, phone, email,
      city, community
    } = data

    data = { name, identificationNumber, legalRepresentative, identificationType, identification, phone, email, departament, city, community }
    dispatch(updateOrganization({ id, data }))
    router.push('/organizations')
  }

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Layout pageTitle={`Organización | ${organization?.name}`}>

      <Container className={classes.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' justifyContent='center' className={classes.box}>
            <Typography variant='h4' color='primary'>
              Modificar organización
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
                    defaultValue={organization?.name}
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
                    defaultValue={organization?.identificationNumber}
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
                    defaultValue={organization?.legalRepresentative}
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
                    id='identification'
                    defaultValue={organization?.identification}
                    label='Número de Documento'
                    variant='outlined'
                    fullWidth
                    className={classes.TextField}
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
                    id='phone'
                    defaultValue={organization?.phone}
                    label='Número de Celular'
                    variant='outlined'
                    fullWidth
                    className={classes.TextField}
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
                    id='email'
                    defaultValue={organization?.email}
                    className={classes.TextField}
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
                    defaultValue={organization?.community}
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

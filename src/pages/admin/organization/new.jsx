import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { IDENTIFICATION_TYPES, DEPARTMENTS, CITIES, IMAGE_CONTENT_TYPES } from 'lib/constans'
import { createOrganization } from 'dux/organizationsSlice'
import {
  TextField,
  Button,
  Container,
  Box,
  Paper,
  Card,
  Grid,
  Table,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TableCell,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TableContainer,
  TableBody,
  DialogActions,
  TableRow,
  TableHead
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Info as InfoIcon } from '@material-ui/icons'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import ErrorIcon from '@material-ui/icons/Error'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import FileUploader from 'components/FileUploader'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'initial'
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
  TextField: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: '2.5em',
    justifyContent: 'center',
    marginBottom: theme.spacing(3)
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: theme.spacing(2)
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  uploaderTitle: {
    marginBottom: theme.spacing(2)
  },
  successColor: {
    color: 'green'
  },
  titleImportant: {
    color: 'red'
  }
}))

const Organization = () => {
  const { register, handleSubmit, control, errors, getValues } = useForm()
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [alert, setAlert] = useState(false)
  const [buttonsend, setButtonsend] = useState(false)

  const StyledTabletCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
    }
  }))(TableCell)

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [attached, setAttached] = useState([])
  const [itemLetterHead, setItemLetterHead] = useState('')
  const [itemSignature, setItemSignature] = useState()

  const addItem = (event) => {
    event.preventDefault()

    setAttached([
      {
        letterHead: itemLetterHead,
        attachedSignature: itemSignature
      }
    ])

    setItemLetterHead('')
    setItemSignature('')
    setOpen(false)
  }

  const handleDeleteItem = (index) => {
    return () => {
      attached.splice(index, 1)
      setAttached([...attached])
    }
  }

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  const docTypes = IDENTIFICATION_TYPES

  const labelWidthDept = labelWidth + 50
  const labelWidthTown = labelWidth + 70
  const isLoading = useSelector(state => state.organizations.isLoading)

  const departments = DEPARTMENTS
  const cities = CITIES
  const [departamentId, setDepartamentId] = useState('')
  function onDepartamentChanged () {
    const getvalueDep = getValues('departament')
    setDepartamentId(getvalueDep)
  }

  const onSubmit = data => {
    const { name, identificationNumber, identificationType, legalRepresentative, identification, phone, email, departament, city, community } = data
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
      community,
      attached
    }))
      .then(() => {
        setButtonsend(true)
        setAlert(!alert)
      })
      .then(() => {
        setTimeout(function () { router.push('/admin') }, 2000)
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
    <Layout pageTitle='Nueva Organizacion'>
      <Container className={classes.container}>
        {alert === true ? <Alert severity='success'>Organización guardada con éxito!</Alert> : null}
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
                        <Select shrink='true' labelWidth={labelWidthTown}>
                          {docTypes.map((doc, index) => {
                            return (
                              <MenuItem key={index} value={doc.key}>
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
                          {
                            departments
                              .filter(
                                (departament) =>
                                  departament.countryId === '170'
                              ).map((country, index) => {
                                return (
                                  <MenuItem key={index} value={country.key}>
                                    {country.value}
                                  </MenuItem>
                                )
                              })
                          }
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
                        <Select shrink='true' labelWidth={labelWidthDept}>
                          {cities
                            .filter(
                              (city) =>
                                city.departamentId === departamentId
                            ).map((ciudad, index) => {
                              return (
                                <MenuItem key={index} value={ciudad.key}>
                                  {ciudad.value}
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
              </Grid>
              <div className={classes.titles}>
                <Typography
                  color='primary'
                  component='h1'
                  variant='h5'
                  gutterBottom
                >
                  Archivos adjuntos del proyecto
                </Typography>
              </div>
              <div className={classes.button}>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<CloudUploadIcon />}
                  onClick={handleClickOpen}
                >
                  adjuntar un documento
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='form-dialog-title'
                >
                  <form onSubmit={addItem}>
                    <DialogTitle id='form-dialog-title'>
                      Adjuntar un archivo
                    </DialogTitle>
                    <DialogContent className={classes.titleImportant}>
                      <DialogContentText className={classes.titleImportant}>
                        Solo es permitido adjuntar archivos en formato PNG,
                        JPG y JPEG. Tamaño máximo 100Mb
                      </DialogContentText>
                      <Typography className={classes.uploaderTitle} variant='h6' color='initial'>
                        Subir Hoja Membrete
                      </Typography>
                      <FileUploader
                        filePrefix='stamp'
                        accept={IMAGE_CONTENT_TYPES}
                        onChange={(file) => { setItemLetterHead(file) }}
                      />
                      <Typography className={classes.uploaderTitle} variant='h6' color='initial'>
                        Subir firma del PDF (formato PNG)
                      </Typography>
                      <FileUploader
                        filePrefix='signature'
                        accept={IMAGE_CONTENT_TYPES}
                        onChange={(file) => { setItemSignature(file) }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color='primary'>
                        Cancelar
                      </Button>
                      <Button
                        onClick={addItem}
                        color='primary'
                        variant='contained'
                        type='submit'
                      >
                        Guardar
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </div>

              <TableContainer
                component={Paper}
                elevation={1}
                className={classes.tableContainer}
              >
                <Table className={classes.table} aria-label='docs'>
                  <TableHead>
                    <TableRow>
                      <StyledTabletCell align='center'>No.</StyledTabletCell>
                      <StyledTabletCell align='center'>
                        Hoja Membrete
                      </StyledTabletCell>
                      <StyledTabletCell align='center'>
                        Firma Digital
                      </StyledTabletCell>
                      <StyledTabletCell align='center'>
                        Eliminar
                      </StyledTabletCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attached.map((files, index) => (
                      <TableRow key={index}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell align='center'>
                          {files.letterHead ? <DoneAllIcon className={classes.successColor} /> : <ErrorIcon color='error' />}
                        </TableCell>
                        <TableCell align='center'>
                          {files.attachedSignature ? <DoneAllIcon className={classes.successColor} /> : <ErrorIcon color='error' />}
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton onClick={handleDeleteItem(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <div className={classes.button}>
                <Button
                  color='primary'
                  variant='contained'
                  fullWidth
                  disabled={buttonsend}
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

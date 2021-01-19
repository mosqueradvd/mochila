import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { createProject, fetchProjects } from 'dux/projectsSlice'
import { PROJECTS_TYPES, ATTACHMENT_TYPES, ATTACHMENT_CONTENT_TYPES } from 'lib/constans'
import {
  TextField,
  Card,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import FileUploader from 'components/FileUploader'
import { getAttachmentTypeById } from 'lib/helpers'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(5),
    textAlign: 'initial'
  },
  form: {
    width: '100%',
    paddingBottom: theme.spacing(1)
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
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: theme.spacing(2)
  },
  tableContainer: {
    marginTop: theme.spacing(2)
  }
}))

const Project = () => {
  const { register, handleSubmit, control, errors } = useForm()
  const router = useRouter()
  const typeProject = PROJECTS_TYPES
  const typesAttached = ATTACHMENT_TYPES
  const inputLabel = useRef(null)
  const [labelWidth] = useState(0)
  const labelWidthTypeProject = labelWidth + 140
  const classes = useStyles()
  const projectStatus = true
  const projects = useSelector(state => state.projects.data)

  let projectId = 0
  let counter = 1
  let prjtLength = Object.keys(projects).length
  const d = new Date()
  const month = d.getMonth() + 1
  const idBody = month + '-' + d.getFullYear()

  if (prjtLength === 0) {
    counter = prjtLength + 1
    projectId = `${counter}` + '-' + `${idBody}`
  } else if (prjtLength > 0) {
    projectId = `${prjtLength++}` + '-' + `${idBody}`
  }
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
  const [itemName, setItemName] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemAttached, setItemAttachment] = useState()

  const addItem = (event) => {
    event.preventDefault()

    setAttached([
      ...attached,
      {
        attachedName: itemName,
        attachedType: itemType,
        attachedArchive: itemAttached
      }
    ])

    setItemName('')
    setItemAttachment('')
    setOpen(false)
  }

  const handleDeleteItem = (index) => {
    return () => {
      attached.splice(index, 1)
      setAttached([...attached])
    }
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])
  const onSubmit = (data) => {
    const {
      projectName,
      projectType,
      projectLocation,
      projectValueInLetters,
      projectValueInNumbers,
      structuringName,
      structuringPhone,
      structuringAddress,
      structuringEmail,
      registerName,
      registerPhone,
      registerAddress,
      registerEmail
    } = data

    dispatch(
      createProject(
        {
          projectId,
          projectName,
          projectType,
          projectLocation,
          projectValueInLetters,
          projectValueInNumbers,
          structuringName,
          structuringPhone,
          structuringAddress,
          structuringEmail,
          registerName,
          registerPhone,
          registerAddress,
          registerEmail,
          projectStatus,
          attached
        }
      )
    )
      .then(() => {
        setButtonsend(true)
        setAlert(!alert)
      })
      .then(() => {
        setTimeout(function () { router.push('/manager') }, 2000)
      })
  }

  return (
    <Layout pageTitle='Nuevo proyecto'>
      <Container className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' justifyContent='center' className={classes.box}>
            <Typography variant='h4' color='primary'>
              Crear nuevo proyecto
            </Typography>
          </Box>
          <Card raised className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='projectName'
                  id='projectName'
                  label='Nombre del proyecto'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  autoFocus
                  fullWidth
                />
                {errors.projectName && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl className={classes.formControl} variant='outlined'>
                  <InputLabel ref={inputLabel} id='projectType'>
                    Tipo de Proyecto
                  </InputLabel>
                  <Controller
                    as={
                      <Select shrink='true' labelWidth={labelWidthTypeProject}>
                        {typeProject.map((doc, index) => {
                          return (
                            <MenuItem key={index} value={doc.key}>
                              {doc.value}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    }
                    name='projectType'
                    id='projectType'
                    variant='outlined'
                    className={classes.selectInput}
                    control={control}
                    rules={{ required: true }}
                    defaultValue=''
                  />
                  {errors.projectType && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='projectLocation'
                  id='projectLocation'
                  label='Ubicación del proyecto'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  fullWidth
                />
                {errors.projectLocation && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='projectValueInLetters'
                  id='projectValueInLetters'
                  label='Valor en letras del proyecto'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  fullWidth
                />
                {errors.projectValueInLetters && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='projectValueInNumbers'
                  id='projectValueInNumbers'
                  label='Valor en números del proyecto'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  fullWidth
                />
                {errors.projectValueInNumbers && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <div className={classes.titles}>
                <Typography
                  color='primary'
                  component='h1'
                  variant='h5'
                  gutterBottom
                >
                  Datos del estructurador del proyecto
                </Typography>
              </div>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='structuringName'
                  id='structuringName'
                  label='Nombre del estructurador del proyecto'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  fullWidth
                />
                {errors.structuringName && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='structuringPhone'
                  id='structuringPhone'
                  label='Teléfono del estructurador'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  fullWidth
                />
                {errors.structuringPhone && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='structuringAddress'
                  id='structuringAddress'
                  label='Dirección del estructurador'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  fullWidth
                />
                {errors.structuringAddress && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  className={classes.TextField}
                  name='structuringEmail'
                  id='structuringEmail'
                  label='Email del Estructurador'
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
                {errors.structuringEmail && (
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
                    {errors.structuringEmail.message}
                  </Typography>
                )}
                {errors.structuringEmail === ' ' && (
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
                    {errors.structuringEmail.message}
                  </Typography>
                )}
              </Grid>
              <div className={classes.titles}>
                <Typography
                  color='primary'
                  component='h1'
                  variant='h5'
                  gutterBottom
                >
                  Datos de quien registra el proyecto
                </Typography>
              </div>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='registerName'
                  id='registerName'
                  label='Nombre de quien registra el Proyecto'
                  inputRef={register({ required: true })}
                  variant='outlined'
                  className={classes.TextField}
                  fullWidth
                />
                {errors.registerName && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='registerPhone'
                  id='registerPhone'
                  label='Teléfono de quien registra'
                  inputRef={register({ required: true })}
                  variant='outlined'
                  className={classes.TextField}
                  fullWidth
                />
                {errors.registerPhone && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='registerAddress'
                  id='registerAddress'
                  label='Dirección de quien registra'
                  inputRef={register({ required: true })}
                  className={classes.TextField}
                  variant='outlined'
                  fullWidth
                />
                {errors.registerAddress && (
                  <Typography variant='caption' color='error'>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  className={classes.TextField}
                  name='registerEmail'
                  id='registerEmail'
                  label='Email de quien registra'
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
                {errors.registerEmail && (
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
                    {errors.registerEmail.message}
                  </Typography>
                )}
                {errors.registerEmail === ' ' && (
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
                    {errors.registerEmail.message}
                  </Typography>
                )}
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
                    <DialogContent>
                      <DialogContentText>
                        Solo es permitido adjuntar archivos en formato PDF,
                        Word, Excel, tamaño máximo 100Mb
                      </DialogContentText>
                      <TextField
                        name='attachedName'
                        id='attachedName'
                        label='Nombre del archivo adjunto'
                        autoFocus
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className={classes.TextField}
                        variant='outlined'
                        fullWidth
                      />
                      <FormControl
                        className={classes.formControl}
                        variant='outlined'
                      >
                        <InputLabel ref={inputLabel} id='attachedType'>
                          Tipo de Documento
                        </InputLabel>
                        <Controller
                          as={
                            <Select shrink='true' labelWidth={labelWidthTypeProject}>
                              {typesAttached.map((doc, index) => {
                                return (
                                  <MenuItem key={index} value={doc.key}>
                                    {doc.value}
                                  </MenuItem>
                                )
                              })}
                            </Select>
                          }
                          name='attachedType'
                          id='attachedType'
                          variant='outlined'
                          className={classes.selectInput}
                          control={control}
                          defaultValue=''
                          onClick={(e) => setItemType(e.target.value)}
                        />
                      </FormControl>
                      <FileUploader
                        filePrefix='project'
                        accept={ATTACHMENT_CONTENT_TYPES}
                        onChange={(file) => { setItemAttachment(file) }}
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
                        Nombre del Archivo
                      </StyledTabletCell>
                      <StyledTabletCell align='center'>
                        Categoría del Archivo
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
                          {files.attachedName}
                        </TableCell>
                        <TableCell align='center'>
                          {getAttachmentTypeById(files.attachedType)?.value}
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
              <div className={classes.titles}>
                <div className={classes.button}>
                  <Button
                    color='primary'
                    variant='contained'
                    fullWidth
                    type='submit'
                    disabled={buttonsend}
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </Grid>
          </Card>
        </form>
        {alert === true ? <Alert severity='success'>Proyecto guardado con éxito!</Alert> : null}
      </Container>
    </Layout>
  )
}

export default Project

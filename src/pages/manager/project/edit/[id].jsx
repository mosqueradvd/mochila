import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { updateProject, fetchProjectById } from 'dux/projectsSlice'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { PROJECTS_TYPES, ATTACHMENT_TYPES, ATTACHMENT_CONTENT_TYPES } from 'lib/constans'
import {
  Typography,
  Container,
  Box,
  Card,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  TableRow,
  Table,
  TableCell,
  TableHead,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import InfoIcon from '@material-ui/icons/Info'
import Animations from 'components/Animations'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { getProjectTypesById, getAttachmentTypeById } from 'lib/helpers'
import FileUploader from 'components/FileUploader'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(5),
    textAlign: 'initial'
  },
  tipography: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em'
    },
    display: 'flex',
    justifyContent: 'left'
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
  },
  titleImportant: {
    color: 'red'
  }
}))

const Project = () => {
  const { register, handleSubmit, control, errors } = useForm()
  const router = useRouter()
  const { id } = router.query

  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(1)

  const dispatch = useDispatch()
  const typeProject = PROJECTS_TYPES
  const typesAttached = ATTACHMENT_TYPES

  const classes = useStyles()

  const isLoading = useSelector(state => state.projects.isLoading)
  const project = useSelector(state => state.projects.current)
  const itemsOld = project?.attached
  const [attached, setAttached] = useState([])
  const [itemName, setItemName] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemAttached, setItemAttachment] = useState()
  const [alert, setAlert] = useState(false)
  const [buttonsend, setButtonsend] = useState(false)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const labelWidthTypeProject = labelWidth + 3

  useEffect(() => {
    dispatch(fetchProjectById(id))
  }, [dispatch, id])

  useEffect(() => {
    setAttached(itemsOld)
  }, [itemsOld])

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

  // closure recuerda el haMmbito donde fue creado, el valor del index de cada elemento
  const handleDeleteItem = (index) => {
    return () => {
      const auxAttached = [...attached]
      auxAttached.splice(index, 1)
      setAttached(auxAttached)
    }
  }

  const onSubmit = (data) => {
    data = { ...data, attached }
    dispatch(updateProject({ id, data }))
      .then(() => {
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
    <Layout pageTitle='Nuevo proyecto'>
      <Container className={classes.container}>
        {alert === true ? <Alert severity='success'>Proyecto modificado con ??xito!</Alert> : null}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.box}>
            <Typography
              variant='h4'
              color='primary'
              gutterBottom
              className={classes.tipography}
            >
              Modificar un proyecto
            </Typography>
          </Box>

          <div className={classes.root}>
            <Card raised className={classes.card}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    name='projectName'
                    id='projectName'
                    label='Nombre del proyecto'
                    defaultValue={project?.projectName}
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
                      defaultValue={getProjectTypesById(project?.projectType)?.key}
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
                    label='Ubicaci??n del proyecto'
                    defaultValue={project?.projectLocation}
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
                    defaultValue={project?.projectValueInLetters}
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
                    label='Valor en n??meros del proyecto'
                    defaultValue={project?.projectValueInNumbers}
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
                    defaultValue={project?.structuringName}
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
                    label='Tel??fono del estructurador'
                    defaultValue={project?.structuringPhone}
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
                    defaultValue={project?.structuringAddress}
                    label='Direcci??n del estructurador'
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
                    defaultValue={project?.structuringEmail}
                    label='Email del Estructurador'
                    variant='outlined'
                    inputRef={register({
                      required: 'Campo obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Formato de correo inv??lido'
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
                    defaultValue={project?.registerName}
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
                    defaultValue={project?.registerPhone}
                    label='Tel??fono de quien registra'
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
                    defaultValue={project?.registerAddress}
                    label='Direcci??n de quien registra'
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
                    defaultValue={project?.registerEmail}
                    label='Email de quien registra'
                    variant='outlined'
                    inputRef={register({
                      required: 'Campo obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Formato de correo inv??lido'
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
                      <DialogContent className={classes.titleImportant}>
                        <DialogContentText className={classes.titleImportant}>
                          Solo es permitido adjuntar archivos en formato PDF,
                          Excel, tama??o m??ximo 10Mb
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
                              <Select labelWidth={labelWidthTypeProject}>
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
                  <Table aria-label='docs'>
                    <TableHead>
                      <TableRow>
                        <StyledTabletCell align='center'>No.</StyledTabletCell>
                        <StyledTabletCell align='center'>
                          Nombre del Archivo
                        </StyledTabletCell>
                        <StyledTabletCell align='center'>
                          Categor??a del Archivo
                        </StyledTabletCell>
                        <StyledTabletCell align='center'>
                          Ver archivo
                        </StyledTabletCell>
                        <StyledTabletCell align='center'>
                          Eliminar
                        </StyledTabletCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attached?.map((files, index) => (
                        <TableRow key={index}>
                          <TableCell align='center'>{index + 1}</TableCell>
                          <TableCell align='center'>
                            {files.attachedName}
                          </TableCell>
                          <TableCell align='center'>
                            {getAttachmentTypeById(files.attachedType)?.value}
                          </TableCell>
                          <TableCell
                            align='center'
                            className={classes.downloadFile}
                          >
                            <Button>
                              <a href={files.attachedArchive} id='download' target='blank'>
                                <CloudDownloadIcon color='primary' />
                              </a>
                            </Button>
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton onClick={handleDeleteItem(index)} color='primary'>
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
                      disabled={buttonsend}
                      type='submit'
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              </Grid>
            </Card>
          </div>
        </form>
      </Container>
    </Layout>
  )
}
export default Project

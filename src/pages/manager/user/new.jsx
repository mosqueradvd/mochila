import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import Layout from 'components/Layout'
import Alert from '@material-ui/lab/Alert'
import { IDENTIFICATION_TYPES, ROLES_TYPES } from 'lib/constans'
import { useForm, Controller } from 'react-hook-form'
import { createUser } from 'dux/usersSlice'
import {
  Grid,
  FormControl,
  Card,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  Container,
  Button,
  CssBaseline,
  Box
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
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
  TextField: {
    marginTop: theme.spacing(1)
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  btnSubmit: {
    margin: theme.spacing(3, 0, 2)
  },
  tipography: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em'
    },
    display: 'flex',
    justifyContent: 'left'
  },
  box: {
    marginBottom: theme.spacing(2)
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const User = () => {
  const { register, handleSubmit, control, errors } = useForm()
  const router = useRouter()

  const inputLabel = useRef(null)
  const classes = useStyles()
  const [labelWidth, setLabelWidth] = useState(0)
  const docTypes = IDENTIFICATION_TYPES
  const rolesTypes = ROLES_TYPES
  const isLoading = useSelector(state => state.users.isLoading)
  const labelWidthTypeProject = labelWidth + 120
  const dispatch = useDispatch()
  const userStatus = true
  const [alert, setAlert] = useState(false)
  const [buttonsend, setButtonsend] = useState(false)

  const onSubmit = (data) => {
    const {
      userName, userIdentification, userIdentificationType, userPhone, userEmail, userRole
    } = data
    dispatch(createUser({ userName, userIdentification, userIdentificationType, userPhone, userEmail, userRole, userStatus }))
      .then(() => {
        setButtonsend(true)
        setAlert(!alert)
      })
      .then(() => {
        setTimeout(function () { router.push('/manager') }, 2000)
      })
  }

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

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
    <Layout pageTitle='Nuevo usuario'>
      <Container className={classes.container}>
        <CssBaseline />
        {alert === true ? <Alert severity='success'>Usuario guardado con ??xito!</Alert> : null}
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            gutterBottom
            className={classes.tipography}
          >
            Registrar usuario
          </Typography>
        </Box>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Card raised className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  className={classes.TextField}
                  id='userName'
                  name='userName'
                  label='Nombres y apellidos'
                  variant='outlined'
                  inputRef={register({ required: true })}
                  fullWidth
                />
                {errors.userName && (
                  <Typography>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl
                  className={classes.formControl}
                  variant='outlined'
                >
                  <InputLabel ref={inputLabel} id='userIdentificationType'>
                    Tipo de documento
                  </InputLabel>
                  <Controller
                    as={
                      <Select shrink='true' labelWidth={labelWidthTypeProject}>
                        {docTypes.map((doc, index) => {
                          return (
                            <MenuItem key={index} value={doc.key}>
                              {doc.value}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    }
                    id='userIdentificationType'
                    name='userIdentificationType'
                    variant='outlined'
                    control={control}
                    rules={{ required: true }}
                    className={classes.selectInput}
                    defaultValue=''
                  />
                  {errors.userIdentificationType && (
                    <Typography variant='caption' color='error'>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  className={classes.TextField}
                  id='userIdentification'
                  name='userIdentification'
                  label='N??mero de documento'
                  variant='outlined'
                  inputRef={register({ required: true })}
                  fullWidth
                />
                {errors.userIdentification && (
                  <Typography>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name='userEmail'
                  className={classes.TextField}
                  id='userEmail'
                  label='Correo Electr??nico'
                  variant='outlined'
                  fullWidth
                  inputRef={register({
                    required: 'Campo obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Formato de correo inv??lido'
                    }
                  })}
                />
                {errors.userEmail && (
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
                    {errors.userEmail.message}
                  </Typography>
                )}
                {errors.userEmail === ' ' && (
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
                    {errors.userEmail.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  className={classes.TextField}
                  id='userPhone'
                  name='userPhone'
                  label='Telefono'
                  variant='outlined'
                  inputRef={register({ required: true })}
                  fullWidth
                />
                {errors.userPhone && (
                  <Typography>
                    <InfoIcon color='error' fontSize='small' />
                    Campo obligatorio
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl
                  className={classes.formControl}
                  variant='outlined'
                >
                  <InputLabel ref={inputLabel} id='userRole'>
                    Rol
                  </InputLabel>
                  <Controller
                    as={
                      <Select labelWidth={labelWidth}>
                        {rolesTypes.filter((role) => role.key !== 'admin')
                          .map((role, index) => {
                            return (
                              <MenuItem key={index} value={role.key}>
                                {role.value}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    }
                    id='userRole'
                    name='userRole'
                    variant='outlined'
                    control={control}
                    rules={{ required: true }}
                    className={classes.selectInput}
                    defaultValue=''
                  />
                  {errors.userRole && (
                    <Typography>
                      <InfoIcon color='error' fontSize='small' />
                      Campo obligatorio
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6} />
            </Grid>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              type='submit'
              disabled={buttonsend}
              className={classes.btnSubmit}
            >
              Guardar
            </Button>
          </Card>
        </form>
      </Container>
    </Layout>
  )
}

export default User

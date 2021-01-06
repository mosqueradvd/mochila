import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjectById, updateProjectStatus } from 'dux/projectsSlice'
import {
  Card,
  Container,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button
} from '@material-ui/core'
import {
  withStyles,
  makeStyles
} from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  container: {
    backgroundColor: '#F8F9FC',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
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
  checkWrapper: {
    width: '100%',
    margin: theme.spacing(1)
  },
  titles: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1)
  },
  tableContainer: {
    marginTop: theme.spacing(2)
  },
  downloadFile: {
    cursor: 'pointer'
  },
  box: {
    marginBottom: theme.spacing(5),
    textAlign: 'center'
  },
  button: {
    marginTop: '2.5em',
    display: 'flex',
    justifyContent: 'center'
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const StyledTabletCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}))(TableCell)

const UserInfo = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query
  const isLoading = useSelector(state => state.projects.isLoading)
  const project = useSelector(state => state.projects.current)
  const attached = project?.attached

  const [estado, setEstado] = useState('')

  useEffect(() => {
    dispatch(fetchProjectById(id))
  }, [dispatch, id])

  useEffect(() => {
    setEstado(project?.projectStatus)
  }, [project])

  const handleState = () => {
    const data = !estado
    dispatch(
      updateProjectStatus({
        id,
        data
      })
    )
    router.push('/admin')
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
    <Layout>
      <Container className={classes.container}>
        <div className={classes.root}>
          <Card raised className={classes.card}>
            <Box className={classes.box}>
              <Typography
                variant='h4'
                color='primary'
                component='h1'
                className={classes.tipography}
              >
                Habilitar o deshabilitar un proyecto
              </Typography>
            </Box>
            <Typography variant='h5' color='primary' gutterBottom>
              Datos del Proyecto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Nombre del proyecto:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.projectName}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Tipo de Proyecto:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.projectType}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Ubicación del Proyecto:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.projectLocation}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Valor en letras del Proyecto:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.projectValueInLetters}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Valor en Números del Proyecto:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}$ {' '}{project?.projectValueInNumbers}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Estado:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{' '}{project?.projectStatus === true ? 'Activo' : 'Inactivo'}
                </Typography>
              </Grid>

              <div className={classes.titles}>
                <Typography variant='h5' color='primary' gutterBottom>
                  Datos del estructurador del proyecto
                </Typography>
              </div>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Nombre del estructurador:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.structuringName}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Teléfono del estructurador:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.structuringPhone}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Dirección del estructurador:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.structuringAddress}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Email del estructurador:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.structuringEmail}
                </Typography>
              </Grid>

              <div className={classes.titles}>
                <Typography variant='h5' color='primary' gutterBottom>
                  Datos de quien registró el proyecto
                </Typography>
              </div>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Nombre de quien registra el proyecto:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.registerName}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Teléfono de quien registra:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.registerPhone}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Dirección de quien registra:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.registerAddress}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Typography
                  variant='h7'
                  color='primary'
                  gutterBottom
                  className={classes.typography}
                >
                  Email de quien registra:
                </Typography>
                <Typography
                  variant='h7'
                  color='initial'
                  className={classes.userInfo}
                >
                  {' '}{project?.registerEmail}
                </Typography>
              </Grid>

              <div className={classes.titles}>
                <Typography variant='h5' color='primary' gutterBottom>
                  Archivos adjuntos del proyecto
                </Typography>
              </div>

              <TableContainer
                component={Paper}
                elevation={1}
                className={classes.tableContainer}
              >
                <Table className={classes.table} aria-label='docs'>
                  <TableHead>
                    <TableRow>
                      <StyledTabletCell align='center'>#</StyledTabletCell>
                      <StyledTabletCell align='center'>
                        Nombre del Archivo
                      </StyledTabletCell>
                      <StyledTabletCell align='center'>
                        Categoría del Archivo
                      </StyledTabletCell>
                      <StyledTabletCell align='center'>
                        Descargar
                      </StyledTabletCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attached?.map((files, index) => (
                      <TableRow key={index}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell align='center'>{files.attachedName}</TableCell>
                        <TableCell align='center'>
                          {files.attachedType}
                        </TableCell>
                        <TableCell
                          align='center'
                          className={classes.downloadFile}
                        >
                          boton para descargar
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <div className={classes.button}>
              <Button
                color='primary'
                variant='contained'
                fullWidth
                type='submit'
                onClick={handleState}
              >
                {estado === true ? 'Deshabilitar' : 'habilitar'}
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </Layout>
  )
}

export default UserInfo

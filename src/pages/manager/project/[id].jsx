import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { fetchProjectById } from 'dux/projectsSlice'
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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import Animations from 'components/Animations'
import { getProjectTypesById, getAttachmentTypeById } from 'lib/helpers'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  card: {
    textAlign: 'initial',
    padding: theme.spacing(3)
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
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
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

  useEffect(() => {
    dispatch(fetchProjectById(id))
  }, [dispatch, id])
  if (isLoading) {
    return (
      <Animations />
    )
  }

  return (
    <Layout>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            component='h1'
          >
            Informaci??n del Proyecto
          </Typography>
          <Link href={`/manager/project/edit/${id}`} shallow>
            <Button
              variant='contained'
              color='primary'
            >
              Editar
            </Button>
          </Link>
        </Box>
        <Card raised className={classes.card}>
          <Typography variant='h5' color='primary' gutterBottom>
            Datos del Proyecto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre del proyecto:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.projectName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Tipo de Proyecto:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{getProjectTypesById(project?.projectType)?.value}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Ubicaci??n del Proyecto:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.projectLocation}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Valor en letras del Proyecto:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.projectValueInLetters}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Valor en N??meros del Proyecto:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}$ {' '}{project?.projectValueInNumbers}
              </Typography>
            </Grid>

            <div className={classes.titles}>
              <Typography variant='h5' color='primary' gutterBottom>
                Datos del estructurador del proyecto
              </Typography>
            </div>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre del estructurador:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.structuringName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Tel??fono del estructurador:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.structuringPhone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Direcci??n del estructurador:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.structuringAddress}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Email del estructurador:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.structuringEmail}
              </Typography>
            </Grid>

            <div className={classes.titles}>
              <Typography variant='h5' color='primary' gutterBottom>
                Datos de quien registr?? el proyecto
              </Typography>
            </div>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Nombre de quien registra el proyecto:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.registerName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Tel??fono de quien registra:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.registerPhone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Direcci??n de quien registra:
              </Typography>
              <Typography
                color='initial'
              >
                {' '}{project?.registerAddress}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography
                color='primary'
                gutterBottom
                className={classes.typography}
              >
                Email de quien registra:
              </Typography>
              <Typography
                color='initial'
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
              <Table aria-label='docs'>
                <TableHead>
                  <TableRow>
                    <StyledTabletCell align='center'>#</StyledTabletCell>
                    <StyledTabletCell align='center'>
                      Nombre del Archivo
                    </StyledTabletCell>
                    <StyledTabletCell align='center'>
                      Categor??a del Archivo
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Card>
      </Container>
    </Layout>
  )
}

export default UserInfo

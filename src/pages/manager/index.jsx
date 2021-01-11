import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'components/Layout'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { fetchProjects } from 'dux/projectsSlice'
import Skeleton from '@material-ui/lab/Skeleton'
export { getServerSideProps } from 'lib/ssr'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minWidth: 275,
    maxWidth: 300,
    marginLeft: theme.spacing(4)
  },
  pos: {
    marginBottom: 12
  },
  box: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',

    alignItems: 'center'
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

const Dashboard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.projects.isLoading)
  const projects = useSelector(state => state.projects.data)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

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
  if (Object.keys(projects).length === 0) {
    return (
      <Layout pageTitle='dashboard'>
        <Container className={classes.container}>
          <Box className={classes.box}>
            <Typography variant='h4' color='primary' component='h1'>
              Aún no exiten proyectos que mostar
            </Typography>
          </Box>
        </Container>
      </Layout>
    )
  }
  return (
    <Layout pageTitle='dashboard'>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Typography variant='h4' color='primary' component='h1'>
            Proyectos registrados
          </Typography>
        </Box>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {projects.map((row, index) => {
              return (
                <Grid item xs key={index}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant='h6' color='textSecondary' gutterBottom>
                        {row?.projectName}
                      </Typography>
                      <Typography variant='h6' component='h2'>
                        {row?.projectLocation}
                      </Typography>
                      <Typography variant='h6' component='h2'>
                        {row?.projectType}
                      </Typography>
                      <Typography className={classes.pos} color='textSecondary'>
                        {row?.projectValueInNumbers}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        href={`/manager/project/${row._id}`}
                      >
                        <Button size='small'>Ver más</Button>
                      </Link>

                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </Container>
    </Layout>
  )
}

export default Dashboard

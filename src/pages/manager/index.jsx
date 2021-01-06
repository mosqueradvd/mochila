import React, { useEffect } from 'react'
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
import { fetchProjects } from '@dux/projectsSlice'
import Skeleton from '@material-ui/lab/Skeleton'

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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
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
    backgroundColor: '#cfe8fc',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(2)
    }
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
                      <Button size='small'>Ver más</Button>
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

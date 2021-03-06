import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react'
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

import Search from 'components/Search'
import Animations from 'components/Animations'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { fetchProjects } from 'dux/projectsSlice'
import { getProjectTypesById } from 'lib/helpers'
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
  }
}))

const Dashboard = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.projects.isLoading)
  const projects = useSelector(state => state.projects.data)
  const searchInput = useRef(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, []
  )

  const filteredProject = useMemo(() =>
    projects.filter((project) => {
      return project.projectName.toLowerCase().includes(search?.toLowerCase())
    }), [projects, search])

  if (isLoading) {
    return (
      <Animations />
    )
  }
  if (Object.keys(projects).length === 0) {
    return (
      <Layout pageTitle='dashboard'>
        <Container className={classes.container}>
          <Box className={classes.box}>
            <Typography variant='h4' color='primary' component='h1'>
              A??n no exiten proyectos que mostar
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
        <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
        <div className={classes.root}>
          <Grid container spacing={3}>
            {filteredProject.map((row, index) => {
              return (
                <Grid item xs key={index}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography variant='h6' color='primary' gutterBottom>
                        {row?.projectName}
                      </Typography>
                      <Typography variant='h6' component='h2'>
                        {getProjectTypesById(row?.projectType)?.value}
                      </Typography>
                      <Typography variant='h6' component='h2'>
                        {row?.projectLocation}
                      </Typography>
                      <Typography className={classes.pos} color='textSecondary'>
                        ${' '}{row?.projectValueInNumbers}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        href={`/manager/project/${row.id}`}
                      >
                        <Button size='small'>Ver m??s</Button>
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

import React from 'react'
import {
  Container,
  CssBaseline,
  Typography,
  Divider,
  Box
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@components/Layout'

const useStyles = makeStyles((theme) => ({
  tipography: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em'
    }
  },
  container: {
    backgroundColor: '#cfe8fc',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: theme.spacing(5)
  }
}))

const ComponentDashboard = () => {
  const classes = useStyles()
  return (

    <Container className={classes.container}>
      <Layout pageTitle='dashboard'>
        <CssBaseline />
        <Box className={classes.box}>
          <Typography
            variant='h4'
            color='primary'
            component='h1'
            className={classes.tipography}
          >
            Tablero de comando
          </Typography>
        </Box>
        <Divider />
      </Layout>
    </Container>

  )
}
export default ComponentDashboard

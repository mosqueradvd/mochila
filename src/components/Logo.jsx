import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { getCurrentUser } from 'dux/loginSlice'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    maxWidth: 230,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 3
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

export default function OutlinedCard () {
  const classes = useStyles()
  const user = useSelector(getCurrentUser)
  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography variant='body2' color='primary'>
          {user.userEmail}
        </Typography>
      </CardContent>
      <img src='https://mochila-uploads.s3.amazonaws.com/files/logoMF.jpg' />
    </Card>

  )
}

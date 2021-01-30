import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  skeleton: {
    marginTop: '300',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default function Animations () {
  const classes = useStyles()
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

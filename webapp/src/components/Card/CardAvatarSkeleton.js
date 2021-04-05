import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'

import styles from './styles'

const useStyles = makeStyles(styles)

const Media = () => {
  const classes = useStyles()

  return (
    <Card className={classes.cardSkeleton}>
      <Skeleton
        animation="wave"
        variant="rect"
        className={classes.mediaSkeleton}
      />
      <CardContent>
        <>
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation="wave" height={10} />
        </>
      </CardContent>
    </Card>
  )
}

export default Media

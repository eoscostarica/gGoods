import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import Img from '../../images/avatar.png'

import styles from './styles'

const useStyles = makeStyles(styles)

const CardAvatar = () => {
  const classes = useStyles()

  return (
    <Card className={classes.cardAvatarRoot}>
      <CardActionArea>
        <CardMedia component="img" image={Img} />
      </CardActionArea>
      <CardActions>
        <Typography>Name</Typography>
      </CardActions>
    </Card>
  )
}

export default CardAvatar

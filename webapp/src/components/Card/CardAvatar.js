import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as LinkRouter } from 'react-router-dom'
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
      <LinkRouter
        style={{ textDecoration: 'none' }}
        to={{ pathname: `/good/ID` }}
      >
        <CardActionArea>
          <CardMedia component="img" image={Img} />
        </CardActionArea>
      </LinkRouter>
      <CardActions>
        <Typography>Name</Typography>
      </CardActions>
    </Card>
  )
}

export default CardAvatar

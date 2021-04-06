import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Link as LinkRouter } from 'react-router-dom'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import styles from './styles'

const useStyles = makeStyles(styles)

const CardGame = ({ name, by, description, img, pathname }) => {
  const classes = useStyles()

  return (
    <LinkRouter style={{ textDecoration: 'none' }} to={{ pathname }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.cardOngMedia}
            image={img}
            title={name}
          />
          <CardContent>
            <Typography
              className={classes.cardgameTitle}
              variant="h5"
              component="h2"
            >
              {name}
            </Typography>
            {by && (
              <Typography variant="h4" className={classes.cardOngCategory}>
                by {by}
              </Typography>
            )}
            <Box className={classes.cardOngDescriptionBox}>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActionOngArea}>
          <ArrowForwardIcon color="primary" />
        </CardActions>
      </Card>
    </LinkRouter>
  )
}

CardGame.propTypes = {
  name: PropTypes.string,
  by: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  pathname: PropTypes.string
}

export default CardGame

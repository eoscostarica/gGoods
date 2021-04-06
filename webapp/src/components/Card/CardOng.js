import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import styles from './styles'

const useStyles = makeStyles(styles)

const CardOng = ({ name, category, description, img, id }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.cardOngMedia} image={img} title={name} />
        <CardContent>
          <Typography
            className={classes.cardOngTitle}
            variant="h5"
            component="h2"
          >
            {name}
          </Typography>
          <Typography className={classes.cardOngCategory} component="h4">
            {category}
          </Typography>
          <Box className={classes.cardOngDescriptionBox}>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActionOngArea}>
        <LinkRouter
          style={{ textDecoration: 'none' }}
          to={{ pathname: `/organization/${id}` }}
        >
          <IconButton
            aria-label="open"
            className={classes.arrowIcon}
            color="primary"
          >
            <ArrowForwardIcon />
          </IconButton>
        </LinkRouter>
      </CardActions>
    </Card>
  )
}

CardOng.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string
}

export default CardOng

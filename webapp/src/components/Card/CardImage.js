import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const CardImage = ({ img, primaryText, secondaryText }) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardImageRoot}>
      <CardActionArea>
        <CardMedia className={classes.cardImageMedia} image={img} />
        <Box className={classes.boxInfoCard}>
          <Typography variant="h5">{primaryText}</Typography>
          <Typography>{secondaryText}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}

CardImage.propTypes = {
  img: PropTypes.any,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string
}

export default CardImage

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

const useStyles = makeStyles(styles)

const CardInfo = ({ img, primaryText, secondaryText }) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardInfoRoot}>
      <CardContent className={classes.cardContent}>
        <Box>
          <Typography variant="h5" component="h2">
            {primaryText}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {secondaryText}
          </Typography>
        </Box>
        <img className={classes.infoImg} src={img} />
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.btnLearnMore}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

CardInfo.propTypes = {
  img: PropTypes.any,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string
}

export default CardInfo

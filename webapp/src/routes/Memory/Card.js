import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import ReactCardFlip from 'react-card-flip'

import styles from './styles'

const useStyles = makeStyles(styles)

const Card = ({ image, isCardCompared, selectCard, guessedRight }) => {
  const classes = useStyles()

  return (
    <Box className={classes.card} onClick={selectCard}>
      <ReactCardFlip
        isFlipped={isCardCompared || guessedRight}
        flipDirection="vertical"
      >
        <Box className={classes.cover}></Box>
        <Box className={classes.content}>
          <img src={image} alt="memory-img" />
        </Box>
      </ReactCardFlip>
    </Box>
  )
}

Card.propTypes = {
  image: PropTypes.any,
  isCardCompared: PropTypes.bool,
  selectCard: PropTypes.func,
  guessedRight: PropTypes.bool
}

export default Card

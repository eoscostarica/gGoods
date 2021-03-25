import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import ReactCardFlip from 'react-card-flip'

import styles from './styles'

const useStyles = makeStyles(styles)

const Card = ({ image, isCardCompared, selectCard, guessedRight }) => {
  const classes = useStyles()

  return (
    <div className={classes.card} onClick={selectCard}>
      <ReactCardFlip
        isFlipped={isCardCompared || guessedRight}
        flipDirection="vertical"
      >
        <div className={classes.cover}></div>
        <div className={classes.content}>
          <img src={image} alt="memory-img" />
        </div>
      </ReactCardFlip>
    </div>
  )
}

Card.propTypes = {
  image: PropTypes.any,
  isCardCompared: PropTypes.bool,
  selectCard: PropTypes.func,
  guessedRight: PropTypes.bool
}

export default Card

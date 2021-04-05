import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import ReactCardFlip from 'react-card-flip'

import CardAvatar from '../../components/Card/CardAvatar'
import styles from './styles'

const useStyles = makeStyles(styles)

const Card = ({
  index,
  name,
  image,
  backgroundColor,
  isOpen,
  isGuessedRight,
  onClickCard
}) => {
  const classes = useStyles()
  const handleOnClick = () => {
    if (!onClickCard || isOpen || isGuessedRight) {
      return
    }

    onClickCard(index)
  }

  return (
    <Box className={classes.card} onClick={handleOnClick}>
      <ReactCardFlip
        isFlipped={isOpen || isGuessedRight}
        flipDirection="vertical"
      >
        <Box className={classes.cover}></Box>
        <Box className={classes.content}>
          <CardAvatar
            name={name}
            image={image}
            backgroundColor={backgroundColor}
          />
        </Box>
      </ReactCardFlip>
    </Box>
  )
}

Card.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  backgroundColor: PropTypes.string,
  isOpen: PropTypes.bool,
  isGuessedRight: PropTypes.bool,
  onClickCard: PropTypes.func
}

export default Card

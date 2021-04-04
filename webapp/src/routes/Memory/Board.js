import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

import Card from './Card'
import styles from './styles'

const useStyles = makeStyles(styles)

const Board = ({ deck, pair, onClickCard }) => {
  const classes = useStyles()

  return (
    <Box className={classes.board}>
      {deck.map((card, index) => {
        const isOpen = pair.a === index || pair.b === index

        return (
          <Card
            key={index}
            index={index}
            name={card.name}
            image={card.image}
            backgroundColor={card.backgroundColor}
            isOpen={isOpen}
            isGuessedRight={card.isGuessedRight}
            onClickCard={onClickCard}
          />
        )
      })}
    </Box>
  )
}

Board.propTypes = {
  deck: PropTypes.array,
  pair: PropTypes.object,
  onClickCard: PropTypes.func
}

export default Board

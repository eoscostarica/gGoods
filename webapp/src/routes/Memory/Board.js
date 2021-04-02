import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'

import Card from './Card'

import styles from './styles'

const useStyles = makeStyles(styles)

const Board = ({ deck, pairSelected, selectCard }) => {
  const classes = useStyles()

  return (
    <Box className={classes.board}>
      {(deck || []).map((card, index) => {
        const isCardCompared = pairSelected.indexOf(card) > -1

        return (
          <Card
            key={index}
            image={card.image}
            isCardCompared={isCardCompared}
            selectCard={() => selectCard(card)}
            guessedRight={card.guessedRight}
          />
        )
      })}
    </Box>
  )
}

Board.propTypes = {
  deck: PropTypes.array,
  pairSelected: PropTypes.array,
  selectCard: PropTypes.func
}

export default Board

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import { buildDeck } from '../../utils'

import MemoryHeader from './MemoryHeader'
import Board from './Board'
import styles from './styles'

const useStyles = makeStyles(styles)

const Memory = ({ customOptions = [] }) => {
  const classes = useStyles()
  const [deck, setDeck] = useState()
  const [pairSelected, setPairSelected] = useState()
  const [pairCompared, setPairCompared] = useState()
  const [attempts, setAttempts] = useState()

  const selectCard = card => {
    if (pairCompared || pairSelected.indexOf(card) > -1 || card.guessedRight) {
      return
    }

    const newPairSelected = [...pairSelected, card]

    setPairSelected(newPairSelected)

    if (newPairSelected.length === 2) {
      comparePair(newPairSelected)
    }
  }

  const comparePair = pair => {
    setPairCompared(true)

    setTimeout(() => {
      const [firstCard, secondCard] = pair
      let newDeck = deck

      if (firstCard.image === secondCard.image) {
        newDeck = newDeck.map(card => {
          if (card.image !== firstCard.image) return card

          return { ...card, guessedRight: true }
        })
      }

      verifyGame(deck)

      setDeck(newDeck)
      setPairSelected([])
      setPairCompared(false)
      setAttempts(attempts + 1)
    }, 1000)
  }

  const verifyGame = deck => {
    if (deck.filter(card => !card.guessedRight).length === 0) {
      console.log(`Win with ${attempts} attempts!`)
    }
  }

  const resetGame = () => {
    setDeck(buildDeck(customOptions))
    setPairSelected([])
    setPairCompared(false)
    setAttempts(0)
  }

  useEffect(() => {
    resetGame()
  }, [])

  return (
    <Box className={classes.memoryGame}>
      <MemoryHeader attempts={attempts} resetGame={resetGame} />
      <Board deck={deck} pairSelected={pairSelected} selectCard={selectCard} />
    </Box>
  )
}

Memory.propTypes = {
  customOptions: PropTypes.array
}

export default Memory

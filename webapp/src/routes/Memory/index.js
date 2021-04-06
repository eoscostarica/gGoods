import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { useQuery } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import { buildDeck, getUniqueGGoodsByName } from '../../utils'
import { MY_GGOODS } from '../../gql'

import MemoryHeader from './MemoryHeader'
import Board from './Board'
import styles from './styles'

const useStyles = makeStyles(styles)

const Memory = () => {
  const classes = useStyles()
  const { t } = useTranslation('memoryRoute')
  const [deck, setDeck] = useState()
  const [pair, setPair] = useState()
  const [attempts, setAttempts] = useState()
  const { loading, data } = useQuery(MY_GGOODS, { fetchPolicy: 'network-only' })

  const handleOnClickCard = index => {
    const newPair = {
      ...pair,
      [typeof pair.a === 'undefined' ? 'a' : 'b']: index
    }

    setPair(newPair)
    comparePair(newPair)
  }

  const comparePair = pair => {
    if (typeof pair.a === 'undefined' || typeof pair.b === 'undefined') {
      return
    }

    const firstCard = deck[pair.a]
    const secondCard = deck[pair.b]

    setTimeout(() => {
      setAttempts(attempts + 1)
      setPair({})

      if (firstCard.id !== secondCard.id) {
        return
      }

      const newDeck = deck.map((card, index) => {
        if (index !== pair.a && index !== pair.b) {
          return card
        }

        return { ...card, isGuessedRight: true }
      })
      console.log(newDeck)
      setDeck(newDeck)
      verifyGame(newDeck)
    }, 1000)
  }

  const verifyGame = deck => {
    if (deck.filter(card => !card.isGuessedRight).length > 0) {
      return
    }

    alert(t('winMessage'))
    handleOnResetGame()
  }

  const handleOnResetGame = () => {
    setAttempts(0)
    setPair({})
    setDeck(
      buildDeck(
        getUniqueGGoodsByName(data?.ggoods).map(ggood => ({
          id: ggood.id,
          name: ggood.metadata.name,
          image: `${ggood.metadata.imageSmall}`,
          backgroundColor: ggood.metadata.backgroundColor
        }))
      )
    )
  }

  useEffect(() => {
    if (!data?.ggoods?.length) {
      return
    }

    handleOnResetGame()
  }, [data?.ggoods])

  return (
    <Box className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {t('title')}
      </Typography>
      {loading && <CircularProgress />}
      {!loading && !data?.ggoods?.length && (
        <>
          <Typography variant="body1" gutterBottom>
            {t('emptyMessage')}
          </Typography>
          <Button component={Link} color="primary" to="/goods">
            <KeyboardArrowRightIcon />
            {t('marketplaceLink')}
          </Button>
        </>
      )}
      {!loading && !!data?.ggoods?.length && (
        <Typography variant="body1" gutterBottom>
          {t('paragraph')}
        </Typography>
      )}
      {deck?.length && (
        <>
          <MemoryHeader
            t={t}
            attempts={attempts}
            onResetGame={handleOnResetGame}
          />
          <Board deck={deck} pair={pair} onClickCard={handleOnClickCard} />
        </>
      )}
    </Box>
  )
}

Memory.propTypes = {}

export default Memory

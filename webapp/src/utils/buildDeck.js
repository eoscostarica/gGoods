import shuffle from 'lodash.shuffle'

import { bglist } from '../images/templates/templatelist'

const MAX_CARDS_NUMBER = 20

export const buildDeck = options => {
  let data = []
  const cards = []

  if (!options.length && options.length < 10) {
    const splitedData = bglist.slice(0, 10 - options.length)

    data = [...options, ...splitedData]
  }

  while (cards.length < MAX_CARDS_NUMBER) {
    const index = Math.floor(Math.random() * data.length)
    const card = {
      image: data.splice(index, 1)[0],
      guessedRight: false
    }

    cards.push(card)
    cards.push({ ...card })
  }

  return shuffle(cards)
}

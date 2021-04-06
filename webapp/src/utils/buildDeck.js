import shuffle from 'lodash.shuffle'

const MAX_CARDS_NUMBER = 20

export const buildDeck = ggoods => {
  if (!ggoods.length) {
    return []
  }

  const splitedData = ggoods.slice(0, MAX_CARDS_NUMBER)
  const cards = [...splitedData, ...splitedData].map(ggood => ({
    ...ggood,
    isGuessedRight: false
  }))

  while (cards.length < MAX_CARDS_NUMBER) {
    const index = Math.floor(Math.random() * ggoods.length)
    const card = {
      ...ggoods[index],
      isGuessedRight: false
    }

    cards.push(card)
    cards.push(card)
  }

  return shuffle(cards)
}

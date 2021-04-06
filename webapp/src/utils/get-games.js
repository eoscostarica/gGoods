import selfieCamPortrait from '../images/assets/selfiecam-portrait.jpg'
import travelingGoodsPortrait from '../images/assets/travelingGoods-portrait.jpg'
import comingSoonPortrait from '../images/assets/comingSoon.jpg'
import memoryPortrait from '../images/assets/memory-portrait.jpg'

export const getGames = (onlyGames = false) => {
  const items = [
    {
      name: 'Selfie Cam',
      by: 'EOS Costa Rica',
      pathname: '/games/selfie-cam',
      description:
        'Select one of your Goods and take a selfie together, then share the image to your social media and spread the word.',
      img: selfieCamPortrait
    },
    {
      name: 'Traveling gGoods',
      by: 'EOS Costa Rica',
      pathname: 'games/ggoods-land',
      description:
        'Let your NFTs explore the world! By being exposed to new places, people, and cultures, you will develop a wider world view',
      img: travelingGoodsPortrait
    },
    {
      name: 'gGoods Memory',
      by: 'EOS Costa Rica',
      pathname: '/games/memory',
      description:
        'A classic card game in which all of the cards are NFTs! The object of the game is to turn over pairs of matching cards.',
      img: memoryPortrait
    }
  ]

  if (!onlyGames) {
    items.push({
      name: 'More Apps Coming Soon',
      by: 'EOSIO Community',
      pathname: '/games',
      description:
        'gGoods can integrate with countless apps such as games and social media, the open-source community can develop new ideas for the platform.',
      img: comingSoonPortrait
    })
  }

  return items
}

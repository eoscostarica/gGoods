import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

import { CardGame } from '../../components/Card'
import styles from './styles'

const useStyles = makeStyles(styles)

const GAME_LIST = [
  {
    name: 'Selfie Cam',
    pathname: '/games/selfie-cam',
    description:
      'Select one of your Goods and take a selfie together, then share the image to your social media and spread the word.',
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLm94nV3FeX81RSgRuKGJ2RDTtqJNblQVWw&usqp=CAU'
  },
  {
    name: 'Free your NFT!',
    pathname: '',
    description:
      'Let your NFTs explore the world! By being exposed to new places, people, and cultures, you will develop a wider world view',
    img:
      'https://images-na.ssl-images-amazon.com/images/I/71XltR452RL._AC_SL1500_.jpg'
  },
  {
    name: 'Ggoods Memory',
    pathname: '/games/memory',
    description:
      'A classic card game in which all of the cards are NFTs! The object of the game is to turn over pairs of matching cards.',
    img:
      'https://h5p.org/sites/default/files/styles/medium-logo/public/logos/memory-game-icon.png?itok=bIQqHE7Y'
  },
  {
    name: 'More Apps Coming Soon',
    pathname: '/games',
    description:
      'gGoods can integrate with countless apps such as games and social media, the open-source community can develop new ideas for the platform.',
    img:
      'https://raw.githubusercontent.com/eoscostarica/gGoods/main/webapp/src/images/logos/more-apps-soon.png?token=ABK7HRVGRMGGYEPJCUJOJ43AM7KN6'
  }
]

const Games = () => {
  const classes = useStyles()
  const { t } = useTranslation('gamesRoute')

  return (
    <Box className={classes.mainBox}>
      <Typography variant="h4" className={classes.titlePage}>
        {t('title')}
      </Typography>
      <Typography className={classes.textPageDescription}>
        {t('paragraph1')}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {GAME_LIST.map(game => (
            <Grid item xs={12} md={6} lg={3} key={game.name}>
              <CardGame
                name={game.name}
                category={game.category}
                description={game.description}
                img={game.img}
                pathname={game.pathname}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

Games.propTypes = {}

export default Games

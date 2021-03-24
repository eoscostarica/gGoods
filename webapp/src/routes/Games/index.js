import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

import { CardGame } from '../../components/Card'
import styles from './styles'

const useStyles = makeStyles(styles)

const GamesList = [
  {
    name: 'Selfie Cam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida',
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLm94nV3FeX81RSgRuKGJ2RDTtqJNblQVWw&usqp=CAU'
  },
  {
    name: 'Free your Animal',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida rhoncus id non eu tempor diam maximu',
    img:
      'https://images-na.ssl-images-amazon.com/images/I/71XltR452RL._AC_SL1500_.jpg'
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
          {GamesList.map(game => (
            <Grid item xs={12} md={6} lg={3} key={game.name}>
              <CardGame
                name={game.name}
                category={game.category}
                description={game.description}
                img={game.img}
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

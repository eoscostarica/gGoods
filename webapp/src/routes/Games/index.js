import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

import { CardGame } from '../../components/Card'
import { getGames } from '../../utils'

import styles from './styles'

const useStyles = makeStyles(styles)

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
          {getGames().map(game => (
            <Grid item xs={12} md={6} lg={3} key={game.name}>
              <CardGame
                name={game.name}
                by={game.by}
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

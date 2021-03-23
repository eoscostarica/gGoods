import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

import { CardAvatar } from '../../components/Card'
import styles from './styles'

const useStyles = makeStyles(styles)

const GamesList = [
  {
    name: 'Selfie Cam'
  },
  {
    name: 'Free your Animal'
  }
]

const Goods = () => {
  const classes = useStyles()
  const { t } = useTranslation('goodsRoute')

  return (
    <Box>
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
              <CardAvatar />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

Goods.propTypes = {}

export default Goods

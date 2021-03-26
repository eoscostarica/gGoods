import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

import { CardAvatar } from '../../components/Card'
import styles from './styles'

const useStyles = makeStyles(styles)

const GOODS_LIST = [
  {
    name: 'Selfie Cam'
  },
  {
    name: 'Free your Animal'
  },
  {
    name: 'Free your Animal'
  },
  {
    name: 'Free your Animal'
  },
  {
    name: 'Free your Animal'
  },
  {
    name: 'Free your Animal'
  },
  {
    name: 'Free your Animal'
  }
]

const Goods = () => {
  const classes = useStyles()
  const { t } = useTranslation('goodsRoute')

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
          {GOODS_LIST.map(game => (
            <Grid item xs={6} md={3} lg={2} key={game.name}>
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

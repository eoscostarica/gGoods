import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Carousel from '../../components/Carousel'
import styles from './styles'

const useStyles = makeStyles(styles)

const YourCollection = () => {
  const classes = useStyles()
  const { t } = useTranslation('collectionRoute')

  return (
    <Box className={classes.mainBox}>
      <Typography variant="h4" gutterBottom>
        {t('title')}
      </Typography>
      <Typography variant="body1">{t('paragraph1')}</Typography>
      <Box>
        <Carousel items={[1, 2, 3, 4, 5, 6]} />
      </Box>
    </Box>
  )
}

YourCollection.propTypes = {}

export default YourCollection

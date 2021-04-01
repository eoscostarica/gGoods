import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './styles'
import { MY_GGOODS } from '../../gql'
import Carousel from '../../components/Carousel'
import { mainConfig } from '../../config'

const useStyles = makeStyles(styles)

const YourCollection = () => {
  const classes = useStyles()
  const { t } = useTranslation('collectionRoute')
  const { loading, data } = useQuery(MY_GGOODS, { fetchPolicy: 'network-only' })

  return (
    <Box className={classes.mainBox}>
      <Typography variant="h4" gutterBottom>
        {t('title')}
      </Typography>
      <Typography variant="body1">{t('paragraph1')}</Typography>
      {loading && <CircularProgress />}
      {!loading && (
        <Box>
          <Carousel
            items={(data?.ggoods || [])
              ?.filter(item => !!item?.metadata?.imageSmall)
              .map(item => ({
                id: `${item?.id}`,
                image: `${mainConfig.ipfsUrl}/ipfs/${item?.metadata?.imageSmall}`,
                backgroundColor: item?.metadata?.backgroundColor
              }))}
          />
        </Box>
      )}
    </Box>
  )
}

YourCollection.propTypes = {}

export default YourCollection

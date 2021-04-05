import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/client'

import styles from './styles'
import { MY_GGOODS } from '../../gql'
import Carousel from '../../components/Carousel'
import { mainConfig } from '../../config'

const useStyles = makeStyles(styles)

const YourCollection = () => {
  const classes = useStyles()
  const { t } = useTranslation('collectionRoute')
  const [ggoods, setGgoods] = useState()
  const { loading, data } = useQuery(MY_GGOODS, { fetchPolicy: 'network-only' })

  useEffect(() => {
    if (data?.ggoods) {
      setGgoods(
        data.ggoods
          ?.filter(item => !!item?.metadata?.imageSmall)
          .map(item => ({
            id: `${item?.id}`,
            image: `${mainConfig.ipfsUrl}/ipfs/${item?.metadata?.imageSmall}`,
            backgroundColor: item?.metadata?.backgroundColor,
            description: item?.metadata?.description,
            name: item?.metadata?.name
          }))
      )
    }
  }, [loading])

  return (
    <Box className={classes.mainCollectionBox}>
      <Typography variant="h4" gutterBottom>
        {t('title')}
      </Typography>
      <Typography variant="body1">{t('paragraph1')}</Typography>
      <Box>
        <Carousel isLoading={loading} items={ggoods || []} />
      </Box>
    </Box>
  )
}

YourCollection.propTypes = {}

export default YourCollection

import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/client'

import styles from './styles'
import { MY_GGOODS } from '../../gql'
import Carousel from '../../components/Carousel'

const useStyles = makeStyles(styles)

const YourCollection = () => {
  const classes = useStyles()
  const { t } = useTranslation('collectionRoute')
  const { loading, data } = useQuery(MY_GGOODS, { fetchPolicy: 'network-only' })

  return (
    <Box className={classes.mainCollectionBox}>
      <Typography variant="h4" gutterBottom>
        {t('title')}
      </Typography>
      {loading && <CircularProgress />}
      {!loading && !data?.ggoods?.length && (
        <Typography variant="body1">{t('emptyMessage')}</Typography>
      )}
      {!loading && data?.ggoods?.length && (
        <Typography variant="body1">{t('paragraph1')}</Typography>
      )}
      {data?.ggoods?.length && (
        <Box>
          <Carousel isLoading={loading} items={data?.ggoods || []} />
        </Box>
      )}
    </Box>
  )
}

YourCollection.propTypes = {}

export default YourCollection

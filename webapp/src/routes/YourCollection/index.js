import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import styles from './styles'
import { MY_GGOODS } from '../../gql'
import Carousel from '../../components/Carousel'

const useStyles = makeStyles(styles)

const YourCollection = () => {
  const classes = useStyles()
  const { t } = useTranslation('collectionRoute')
  const { loading, data } = useQuery(MY_GGOODS, { fetchPolicy: 'network-only' })

  return (
    <Box className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {t('title')}
      </Typography>
      {loading && <CircularProgress />}
      {!loading && !data?.ggoods?.length && (
        <>
          <Typography variant="body1" gutterBottom>
            {t('emptyMessage')}
          </Typography>
          <Button component={Link} color="primary" to="/goods">
            <KeyboardArrowRightIcon />
            {t('marketplaceLink')}
          </Button>
        </>
      )}
      {!loading && !!data?.ggoods?.length && (
        <Typography variant="body1" gutterBottom>
          {t('paragraph')}
        </Typography>
      )}
      {!!data?.ggoods?.length && (
        <Carousel
          isLoading={loading}
          items={data?.ggoods || []}
          title={t('ggoodsCollected')}
        />
      )}
    </Box>
  )
}

YourCollection.propTypes = {}

export default YourCollection

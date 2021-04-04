import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import FilterListIcon from '@material-ui/icons/FilterList'
import Button from '@material-ui/core/Button'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { CardAvatar, CardAvatarSkeleton } from '../../components/Card'
import GoodsFilter from '../../components/GoodsFilter'
import { GGOODS_ON_SALE } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const Goods = () => {
  const classes = useStyles()
  const { t } = useTranslation('goodsRoute')
  const history = useHistory()
  const [openFilter, setopenFilter] = useState(false)
  const { loading, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: '' },
    fetchPolicy: 'network-only'
  })

  const handleOnClickCard = id => () => {
    history.push(`/good/${id}`)
  }

  const handlerSetOpenFilter = () => {
    setopenFilter(!openFilter)
  }

  const filter = () => {
    setopenFilter(true)
  }

  return (
    <Box className={classes.mainBox}>
      <Typography variant="h4" className={classes.titlePage}>
        {t('title')}
      </Typography>
      <Typography className={classes.textPageDescription}>
        {t('paragraph1')}
      </Typography>
      <Box className={classes.box}>
        <Typography
          style={{ fontWeight: 'bold' }}
          className={classes.available}
        >
          {ggoods?.items?.length}
          {t('available')}
        </Typography>
        <Button startIcon={<FilterListIcon />} onClick={filter}>
          {t('filter')}
        </Button>
      </Box>
      {loading && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3} lg={2}>
              <CardAvatarSkeleton />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <CardAvatarSkeleton />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <CardAvatarSkeleton />
            </Grid>
          </Grid>
        </Box>
      )}
      <Box>
        <Grid container spacing={2}>
          {ggoods?.items?.map((item, index) => (
            <Grid item xs={6} md={3} lg={2} key={index}>
              <CardAvatar
                id={item.id}
                name={item.metadata.name}
                image={item.metadata.imageSmall}
                backgroundColor={item.metadata.backgroundColor}
                donation={item.amount}
                onClick={handleOnClickCard(item.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <GoodsFilter open={openFilter} handlerOpen={handlerSetOpenFilter} />
    </Box>
  )
}

Goods.propTypes = {}

export default Goods

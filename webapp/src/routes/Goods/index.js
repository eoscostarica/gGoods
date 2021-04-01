import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import FilterListIcon from '@material-ui/icons/FilterList'
import Button from '@material-ui/core/Button'
import { useQuery } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CardAvatar } from '../../components/Card'
import GoodsFilter from '../../components/GoodsFilter'
import { GGOODS_ON_SALE } from '../../gql'
import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const Goods = () => {
  const classes = useStyles()
  const { t } = useTranslation('goodsRoute')
  const [openFilter, setopenFilter] = useState(false)
  const { loading, data } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: '' }
  })

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
          {
            data?.items?.filter(item => !!item?.ggoods[0]?.metadata?.imageSmall)
              .length
          }
          {t('available')}
        </Typography>
        <Button startIcon={<FilterListIcon />} onClick={filter}>
          {t('filter')}
        </Button>
      </Box>
      {loading && <CircularProgress />}
      <Box>
        <Grid container spacing={2}>
          {data?.items
            ?.filter(item => !!item?.ggoods[0]?.metadata?.imageSmall)
            ?.map((item, index) => (
              <Grid item xs={6} md={3} lg={2} key={index}>
                <CardAvatar
                  id={item.id}
                  name={item?.ggoods[0]?.metadata?.name}
                  image={`${mainConfig.ipfsUrl}/ipfs/${item?.ggoods[0]?.metadata?.imageSmall}`}
                  backgroundColor={item?.ggoods[0]?.metadata?.backgroundColor}
                  amount={item?.amount}
                  donable={item?.donable}
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

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import FilterListIcon from '@material-ui/icons/FilterList'
import Button from '@material-ui/core/Button'
import { useQuery } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'

import { CardAvatar } from '../../components/Card'
import GoodsFilter from '../../components/GoodsFilter'
import { GGOODS_ON_SALE } from '../../gql'
import { mainConfig } from '../../config'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const Goods = () => {
  const classes = useStyles()
  const { t } = useTranslation('goodsRoute')
  const history = useHistory()
  const [openFilter, setopenFilter] = useState(false)
  const [ggoodsList, setGGoodsList] = useState()
  const [, { setState }] = useSharedState()
  const { loading, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: '' }
  })

  const handleOnClickCard = ggoodOnSaleSelected => () => {
    setState({
      ggoodOnSaleSelected
    })
    history.push(`/good/${ggoodOnSaleSelected.id}`)
  }

  const handlerSetOpenFilter = () => {
    setopenFilter(!openFilter)
  }

  const filter = () => {
    setopenFilter(true)
  }

  useEffect(() => {
    setGGoodsList(
      (ggoods?.items || [])
        ?.filter(item => !!item?.ggoods[0]?.metadata?.imageSmall)
        .map(item => ({
          id: item.id,
          name: `${item?.ggoods[0]?.metadata?.name} v${item?.ggoods[0]?.serial}`,
          image: `${mainConfig.ipfsUrl}/ipfs/${item?.ggoods[0]?.metadata?.imageSmall}`,
          backgroundColor: item?.ggoods[0]?.metadata?.backgroundColor,
          amount: item.amount
        }))
    )
  }, [ggoods])

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
          {ggoodsList?.length}
          {t('available')}
        </Typography>
        <Button startIcon={<FilterListIcon />} onClick={filter}>
          {t('filter')}
        </Button>
      </Box>
      {loading && <CircularProgress />}
      <Box>
        <Grid container spacing={2}>
          {ggoodsList?.map((item, index) => (
            <Grid item xs={6} md={3} lg={2} key={index}>
              <CardAvatar
                id={item.id}
                name={item.name}
                image={item.image}
                backgroundColor={item.backgroundColor}
                donation={item.amount}
                onClick={handleOnClickCard(item)}
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

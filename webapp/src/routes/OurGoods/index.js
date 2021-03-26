import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/client'

import { GGOODS_ON_SALE, TEMPLATES_QUERY } from '../../gql'
import { mainConfig } from '../../config'

import styles from './styles'

// TODO: filter using account in hasura
const account = 'animalrescue'
const useStyles = makeStyles(styles)

const OurGoods = () => {
  const classes = useStyles()
  const { t } = useTranslation('ourGoodsRoute')
  const [filters, setFilters] = useState()
  const [options, setOptions] = useState()
  const { loading, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: account }
  })
  const { data: templates } = useQuery(TEMPLATES_QUERY, {
    variables: { account }
  })

  const handleToogleFilter = item => {
    if (!item) {
      setFilters({})

      return
    }

    setFilters(prev => ({ ...(prev || {}), [item.name]: !prev?.[item.name] }))
  }

  useEffect(() => {
    if (!ggoods?.items) {
      return
    }

    if (!Object.keys(filters || {}).filter(filter => filters[filter]).length) {
      setOptions(ggoods.items)

      return
    }

    let result = []

    for (const filter in filters) {
      if (!filters[filter]) {
        continue
      }

      result = [
        ...result,
        ...ggoods.items.filter(
          item => item?.ggoods[0]?.metadata?.name === filter
        )
      ]
    }

    setOptions(result)
  }, [ggoods, filters])

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h5">{t('title')}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">{t('description')}</Typography>
      </Grid>

      <Grid item xs={12} className={classes.chips}>
        <Chip
          clickable
          label={t('all')}
          onClick={() => handleToogleFilter(null)}
        />
        {templates?.items?.map(item => (
          <Chip
            clickable
            key={item.id}
            label={item.name}
            onClick={() => handleToogleFilter(item)}
            className={filters?.[item.name] ? classes.selected : null}
          />
        ))}
      </Grid>

      {loading && (
        <Grid item xs={12}>
          <CircularProgress color="secondary" size={20} />
        </Grid>
      )}

      {!loading && !options?.length && (
        <Grid item xs={12}>
          <Typography variant="body1">{t('empty')}</Typography>
        </Grid>
      )}

      {options
        ?.filter(item => !!item?.ggoods[0]?.metadata?.imageSmall)
        ?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  style={{
                    backgroundColor: item?.ggoods[0]?.metadata?.backgroundColor
                  }}
                  className={classes.media}
                  image={`${mainConfig.ipfsUrl}/ipfs/${item?.ggoods[0]?.metadata?.imageSmall}`}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2">
                    {item?.ggoods[0]?.metadata?.name} / v
                    {item?.ggoods[0]?.serial}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item?.ggoods[0]?.metadata?.description} / {item?.amount}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default OurGoods

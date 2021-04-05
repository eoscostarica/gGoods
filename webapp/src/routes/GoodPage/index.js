import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useLazyQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, Link as LinkRouter } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Hidden from '@material-ui/core/Hidden'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CardAvatar } from '../../components/Card'
import DonateNow from '../../components/DonateNow'

import styles from './styles'
import {
  GET_ORGANIZATIONS_BY_ACCOUNT,
  GGOODS_ON_SALE,
  GGOOD_ON_SALE
} from '../../gql'

const useStyles = makeStyles(styles)

const GoodPage = () => {
  const classes = useStyles()
  const history = useHistory()
  const [openPayModal, setOpenPayModal] = useState(false)
  const [organization, setOrganization] = useState()
  const { t } = useTranslation('goodRoute')
  const { id } = useParams()
  const [loadGGood, { loading, data: ggood }] = useLazyQuery(GGOOD_ON_SALE)
  const [loadOrganizations, { data: organizations }] = useLazyQuery(
    GET_ORGANIZATIONS_BY_ACCOUNT
  )
  const [loadGGoods, { data: ggoods }] = useLazyQuery(GGOODS_ON_SALE)

  const handlerSetOpenPayModal = () => {
    setOpenPayModal(!openPayModal)
  }

  const handleOnClickGGood = ({ id }) => {
    history.push(`/good/${id}`)
  }

  const buyNFT = () => {
    setOpenPayModal(true)
  }

  useEffect(() => {
    loadGGood({
      variables: { id }
    })
  }, [id])

  useEffect(() => {
    if (!ggood?.item?.issuer) {
      return
    }

    loadOrganizations({
      variables: {
        orgInfo: {
          account: ggood?.item?.issuer
        }
      }
    })
    loadGGoods({
      variables: { seller: ggood?.item?.issuer }
    })
  }, [ggood])

  useEffect(() => {
    if (!organizations?.items?.length) {
      return
    }

    setOrganization(organizations.items[0])
  }, [organizations])

  return (
    <Box className={classes.mainBox}>
      {loading && <CircularProgress />}
      {!loading && !ggood?.item?.id && (
        <Typography variant="body1">{t('emptyMessage')}</Typography>
      )}
      {ggood?.item?.id && (
        <>
          <Box className={classes.sectionBox}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Hidden mdUp>
                  <Typography variant="h5">
                    {ggood?.item?.metadata.name}
                  </Typography>
                  <LinkRouter
                    style={{ textDecoration: 'none' }}
                    to={{ pathname: `/organization/${organization?.id}` }}
                  >
                    <Typography variant="caption">
                      {t('by')} {organization?.name}
                    </Typography>
                  </LinkRouter>
                </Hidden>
                <Hidden smDown>
                  <Typography variant="h3">
                    {ggood?.item?.metadata?.name}
                  </Typography>
                  <LinkRouter
                    style={{ textDecoration: 'none' }}
                    to={{ pathname: `/organization/${organization?.id}` }}
                  >
                    <Typography variant="h6">
                      {t('by')} {organization?.name}
                    </Typography>
                  </LinkRouter>
                </Hidden>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Hidden smDown>
                <Grid item xs={12} md={7}>
                  <Box className={classes.sectionBox}>
                    <Typography noWrap gutterBottom variant="h6">
                      {t('description')}
                    </Typography>
                    <Typography variant="body1">
                      {ggood?.item?.metadata?.description}
                    </Typography>
                  </Box>
                  <Typography variant="h6" align="center">
                    {t('paragraph1')}
                  </Typography>
                </Grid>
              </Hidden>
              <Grid item xs={12} md={5} className={classes.card}>
                <CardAvatar
                  image={ggood?.item?.metadata?.imageSmall}
                  backgroundColor={ggood?.item?.metadata?.backgroundColor}
                />
                <Box className={classes.priceBox}>
                  <Typography variant="overline">
                    {t('suggestedDonation')}
                  </Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <Box>
                        <Chip
                          label={ggood?.item?.amount}
                          color="primary"
                          className={classes.chip}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className={classes.boxFlexEnd}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.buyButtonDesktop}
                          onClick={buyNFT}
                        >
                          {t('donateNow')}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Hidden mdUp>
                <Grid item xs={12} md={8}>
                  <Box className={classes.sectionBox}>
                    <Typography noWrap gutterBottom variant="h6">
                      {t('description')}
                    </Typography>
                    <Typography variant="body1">
                      {ggood?.item?.metadata?.description}
                    </Typography>
                  </Box>
                  <Typography variant="h6" align="center">
                    {t('paragraph1')}
                  </Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Box>
          <DonateNow
            open={openPayModal}
            handlerOpen={handlerSetOpenPayModal}
            organization={organization}
            ggood={ggood?.item}
          />
        </>
      )}
      {ggoods?.items?.length && (
        <Box className={classes.sectionBox}>
          <Typography noWrap gutterBottom variant="h6">
            {organization?.name} gGoods
          </Typography>
          <Box>
            <Grid container spacing={2}>
              {ggoods?.items?.map((item, index) => (
                <Grid item xs={6} md={3} lg={2} key={index}>
                  <CardAvatar
                    id={item.id}
                    name={item.metadata.name}
                    image={item.metadata.imageSmall}
                    backgroundColor={item.metadata.backgroundColor}
                    onClick={handleOnClickGGood}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default GoodPage

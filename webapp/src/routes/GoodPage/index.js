import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Chip from '@material-ui/core/Chip'
import Hidden from '@material-ui/core/Hidden'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'

import { CardAvatar } from '../../components/Card'
import DonateNow from '../../components/DonateNow'
import { useSharedState } from '../../context/state.context'

import styles from './styles'
import { GET_ORGANIZATION_BY_ACCOUNT, GGOODS_ON_SALE } from '../../gql'

const useStyles = makeStyles(styles)

const GoodPage = () => {
  const classes = useStyles()
  const [openPayModal, setOpenPayModal] = useState(false)
  const [organization, setOrganization] = useState()
  const { t } = useTranslation('goodRoute')
  const [ggoodsList, setGGoodsList] = useState()
  // @todo: load ggood info from api when it's not in the state
  const [{ ggoodOnSaleSelected }] = useSharedState()
  const { data: organizationResults } = useQuery(GET_ORGANIZATION_BY_ACCOUNT, {
    variables: {
      orgInfo: {
        account: ggoodOnSaleSelected?.issuer
      }
    }
  })
  const { loading: loadingGoods, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: ggoodOnSaleSelected?.issuer }
  })

  const handlerSetOpenPayModal = () => {
    setOpenPayModal(!openPayModal)
  }

  const buyNFT = () => {
    setOpenPayModal(true)
  }

  useEffect(() => {
    if (!organizationResults?.organizations?.length) {
      return
    }

    setOrganization(organizationResults.organizations[0])
  }, [organizationResults])

  useEffect(() => {
    setGGoodsList(
      (ggoods?.items || [])
        ?.filter(item => !!item?.ggoods[0]?.metadata?.imageSmall)
        .map(item => ({
          id: item.id,
          name: `${item?.ggoods[0]?.metadata?.name} v${item?.ggoods[0]?.serial}`,
          image: item?.ggoods[0]?.metadata?.imageSmall,
          backgroundColor: item?.ggoods[0]?.metadata?.backgroundColor,
          amount: item.amount,
          donable: item.donable,
          issuer: item?.ggoods[0]?.issuer,
          description: item?.ggoods[0]?.metadata?.description
        }))
    )
  }, [ggoods])

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.sectionBox}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Hidden mdUp>
              <Typography variant="h5">{ggoodOnSaleSelected?.name}</Typography>
              <Typography variant="caption">
                {t('by')} {organization?.name}
              </Typography>
            </Hidden>
            <Hidden smDown>
              <Typography variant="h3">{ggoodOnSaleSelected?.name}</Typography>
              <Typography variant="h6">
                {t('by')} {organization?.name}
              </Typography>
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
                  {ggoodOnSaleSelected?.description}
                </Typography>
              </Box>
              <Typography variant="h6" align="center">
                {t('paragraph1')}
              </Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={5}>
            <Card>
              <CardAvatar
                id={ggoodOnSaleSelected?.id}
                image={ggoodOnSaleSelected?.image}
                backgroundColor={ggoodOnSaleSelected?.backgroundColor}
              />
            </Card>
            <Box className={classes.priceBox}>
              <Typography variant="overline">
                {t('suggestedDonation')}
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Box>
                    <Chip
                      label={ggoodOnSaleSelected?.amount}
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
                  {ggoodOnSaleSelected?.description}
                </Typography>
              </Box>
              <Typography variant="h6" align="center">
                {t('paragraph1')}
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
      <Box className={classes.sectionBox}>
        <Typography noWrap gutterBottom variant="h6">
          {organization?.name} gGoods
        </Typography>
        {!loadingGoods && (
          <Box>
            <Grid container spacing={2}>
              {ggoodsList?.map((item, index) => (
                <Grid item xs={6} md={3} lg={2} key={index}>
                  <CardAvatar
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    backgroundColor={item.backgroundColor}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <DonateNow open={openPayModal} handlerOpen={handlerSetOpenPayModal} />
    </Box>
  )
}

export default GoodPage

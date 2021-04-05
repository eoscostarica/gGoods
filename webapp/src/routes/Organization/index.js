import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'

import { CardAvatar } from '../../components/Card'
import { GET_ORGANIZATION_BY_ID, GGOODS_ON_SALE } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const Organization = () => {
  const classes = useStyles()
  const { id } = useParams()
  const { t } = useTranslation('organizationRoute')
  const [ggoodsList, setGGoodsList] = useState()
  const [account, setAccount] = useState()
  const [organization, setOrganization] = useState()
  const { loading, data: organizationResults } = useQuery(
    GET_ORGANIZATION_BY_ID,
    {
      variables: {
        id: id
      }
    }
  )
  const { loading: loadingGoods, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: account }
  })

  useEffect(() => {
    if (organizationResults) {
      setOrganization(organizationResults.preregister_organization[0])
      setAccount(
        organizationResults.preregister_organization[0].orgInfo.account
      )
    }
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
    <Box>
      {loading && (
        <Box className={classes.centerBox}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!loading && organization && (
        <Box>
          <Box className={classes.mainImageBox}>
            <img
              className={classes.mainImage}
              src={organization.orgInfo.image}
            />
          </Box>
          <Box className={classes.mainBox}>
            <Box className={classes.titleBox}>
              <Hidden smDown>
                <Typography noWrap variant="h3">
                  {organization.name}
                </Typography>
                <Typography noWrap variant="h6">
                  {organization.orgInfo.category}
                </Typography>
              </Hidden>
              <Hidden mdUp>
                <Typography noWrap variant="h5">
                  {organization.name}
                </Typography>
                <Typography noWrap variant="caption">
                  {organization.orgInfo.category}
                </Typography>
              </Hidden>
            </Box>
            <Box className={classes.sectionBox}>
              <Typography noWrap gutterBottom variant="h6">
                {t('objectives')}
              </Typography>
              <Typography variant="body1">
                {organization.orgInfo.objectives}
              </Typography>
            </Box>
            <Box className={classes.sectionBox}>
              <Typography noWrap gutterBottom variant="h6">
                {t('history')}
              </Typography>
              <Typography variant="body1">
                {organization.orgInfo.history}
              </Typography>
            </Box>
            <Box className={classes.sectionBox}>
              <Typography noWrap gutterBottom variant="h6">
                {t('impact')}
              </Typography>
              <Typography variant="body1">
                {organization.orgInfo.impact}
              </Typography>
            </Box>
            <Box className={classes.sectionBox}>
              <Typography noWrap gutterBottom variant="h6">
                {t('information')}
              </Typography>
              <Box className={classes.paddingLeftBox}>
                {organization.orgInfo.website && (
                  <Box className={classes.subSectionBox}>
                    <Typography variant="body1">{t('website')}</Typography>
                    <Typography variant="body2">
                      {organization.orgInfo.website}
                    </Typography>
                  </Box>
                )}
                {organization.address && (
                  <Box className={classes.subSectionBox}>
                    <Typography variant="body1">{t('location')}</Typography>
                    <Typography variant="body2">
                      {organization.address}
                    </Typography>
                  </Box>
                )}
                {organization.email && (
                  <Box className={classes.subSectionBox}>
                    <Typography variant="body1">{t('contact')}</Typography>
                    <Typography variant="body2">
                      {organization.email}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box>
              <Typography noWrap gutterBottom variant="h6">
                {t('ourGoods')}
              </Typography>
              <Box className={classes.sectionBox}>
                {loadingGoods && (
                  <Box className={classes.centerBox}>
                    <CircularProgress color="secondary" />
                  </Box>
                )}
                {!loadingGoods && !ggoodsList?.length && (
                  <Box>
                    <Typography variant="body1">{t('empty')}</Typography>
                  </Box>
                )}
                {!loadingGoods && (
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
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Organization

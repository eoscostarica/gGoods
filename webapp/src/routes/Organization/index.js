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
import Chip from '@material-ui/core/Chip'

import { CardAvatar } from '../../components/Card'
import {
  GET_ORGANIZATION_BY_ID,
  GGOODS_ON_SALE,
  TEMPLATES_QUERY
} from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const Organization = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [filters, setFilters] = useState()
  const [options, setOptions] = useState()
  const { t } = useTranslation('organizationRoute')
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

  const { data: templates } = useQuery(TEMPLATES_QUERY, {
    variables: { account }
  })

  const { loading: loadingGoods, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: account }
  })

  useEffect(() => {
    if (organizationResults) {
      console.log(organizationResults.preregister_organization[0])
      setOrganization(organizationResults.preregister_organization[0])
      setAccount(
        organizationResults.preregister_organization[0].getAccount.account
      )
    }
  }, [organizationResults])

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
                {organization.website && (
                  <Box className={classes.subSectionBox}>
                    <Typography variant="body1">{t('website')}</Typography>
                    <Typography variant="body2">
                      {organization.website}
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
              <Box className={classes.subSectionBox}>
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
              </Box>
              <Box className={classes.sectionBox}>
                {loadingGoods && (
                  <Box className={classes.centerBox}>
                    <CircularProgress color="secondary" />
                  </Box>
                )}
                {!loadingGoods && !options?.length && (
                  <Box>
                    <Typography variant="body1">{t('empty')}</Typography>
                  </Box>
                )}
                {!loadingGoods && (
                  <Grid container spacing={2}>
                    {options
                      ?.filter(item => !!item?.ggoods[0]?.metadata?.imageSmall)
                      ?.map((item, index) => (
                        <Grid item xs={6} md={3} lg={2} key={index}>
                          <CardAvatar
                            name={item?.ggoods[0]?.metadata?.name}
                            donation={item?.amount}
                            img={item?.ggoods[0]?.metadata?.imageSmall}
                            bgColor={item?.ggoods[0]?.metadata?.backgroundColor}
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

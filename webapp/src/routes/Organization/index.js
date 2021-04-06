import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useLazyQuery } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'

import { CardAvatar } from '../../components/Card'
import { GET_ORGANIZATIONS_BY_ID, GGOODS_ON_SALE } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const Organization = () => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const { t } = useTranslation('organizationRoute')
  const [organization, setOrganization] = useState()
  const [loadOrganizations, { loading, data: organizations }] = useLazyQuery(
    GET_ORGANIZATIONS_BY_ID
  )
  const [loadGGoods, { loading: loadingGoods, data: ggoods }] = useLazyQuery(
    GGOODS_ON_SALE
  )

  const handleNavigate = url => () => {
    history.push(url)
  }

  useEffect(() => {
    loadOrganizations({
      variables: {
        id: id
      }
    })
  }, [id])

  useEffect(() => {
    if (!organizations?.items?.length) {
      return
    }

    setOrganization(organizations.items[0])
    loadGGoods({
      variables: { seller: organizations.items[0].orgInfo.account }
    })
  }, [organizations])

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
                {t('description')}
              </Typography>
              <Typography variant="body1">
                {organization.description}
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
                {!loadingGoods && !ggoods?.items?.length && (
                  <Box>
                    <Typography variant="body1">{t('emptyMessage')}</Typography>
                  </Box>
                )}
                {!loadingGoods && (
                  <Grid container spacing={2}>
                    {ggoods?.items?.map((ggood, index) => (
                      <Grid item xs={6} md={3} lg={2} key={index}>
                        <CardAvatar
                          name={ggood.metadata.name}
                          image={ggood.metadata.imageSmall}
                          backgroundColor={ggood.metadata.backgroundColor}
                          onClick={handleNavigate(`/good/${ggood.id}`)}
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

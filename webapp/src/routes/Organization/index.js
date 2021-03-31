import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'

// import { CardAvatar } from '../../components/Card'
import { GET_ORGANIZATION_BY_ID } from '../../gql'
import styles from './styles'

const useStyles = makeStyles(styles)

const Organization = () => {
  const classes = useStyles()
  const { id } = useParams()
  const { t } = useTranslation('organizationRoute')
  const [organization, setOrganization] = useState()
  const { loading, data: organizationResults } = useQuery(
    GET_ORGANIZATION_BY_ID,
    {
      variables: {
        id: id
      }
    }
  )

  useEffect(() => {
    if (organizationResults) {
      setOrganization(organizationResults.preregister_organization[0])
    }
  }, [organizationResults])

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
            <Box className={classes.sectionBox}>
              <Typography noWrap gutterBottom variant="h6">
                {t('ourGoods')}
              </Typography>
              <Box>
                {/* <Grid container spacing={2}>
                  {organization.goodsList.map(game => (
                    <Grid item xs={6} md={3} lg={2} key={game.name}>
                      <CardAvatar />
                    </Grid>
                  ))}
                </Grid>
                */}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Organization

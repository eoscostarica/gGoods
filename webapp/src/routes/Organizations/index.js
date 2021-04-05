import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useQuery } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import { GET_ORGANIZATIONS } from '../../gql'
import { CardOng } from '../../components/Card'
import styles from './styles'

const useStyles = makeStyles(styles)

const Organizations = () => {
  const classes = useStyles()
  const { t } = useTranslation('organizationsRoute')
  const { loading, data: organizations } = useQuery(GET_ORGANIZATIONS, {})

  return (
    <Box className={classes.mainBox}>
      <Typography variant="h4" className={classes.titlePage}>
        {t('title')}
      </Typography>
      <Typography className={classes.textPageDescription}>
        {t('paragraph1')}
      </Typography>
      <Box>
        {loading && (
          <Box className={classes.centerBox}>
            <CircularProgress color="secondary" />
          </Box>
        )}

        <Grid container spacing={2}>
          {!loading &&
            organizations?.items?.length &&
            organizations.items.map(organization => (
              <Grid item xs={12} md={6} lg={3} key={organization.id}>
                <CardOng
                  id={organization.id}
                  name={organization.name}
                  category={organization.category}
                  description={organization.description}
                  img={organization.orgInfo.image}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  )
}

Organizations.propTypes = {}

export default Organizations

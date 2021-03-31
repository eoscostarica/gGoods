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
  const { loading, data: organizationResults } = useQuery(GET_ORGANIZATIONS, {})

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
            organizationResults.preregister_organization.map(org => (
              <Grid item xs={12} md={6} lg={3} key={org.id}>
                <CardOng
                  id={org.id}
                  name={org.name}
                  category={org.category}
                  description={org.description}
                  img={org.orgInfo.image}
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

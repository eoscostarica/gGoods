import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const About = () => {
  const classes = useStyles()
  const { t } = useTranslation('aboutRoute')

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.sectionBox}>
        <Typography variant="h3" gutterBottom>
          {t('title1')}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('whyGgoods')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('whyGgoodsParagraph')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('behindgGoogs')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('behindgGoogsParagraph')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('aboutHack')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('aboutHackParagraph')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.sectionBox}>
        <Typography variant="h3" gutterBottom>
          {t('title2')}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('whatIsblockchain')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('whatIsblockchainParagraph')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('whatIsEOSIO')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('whatIsEOSIOParagraph')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t('whatAreNFT')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('whatAreNFTParagraph')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.sectionBox}>
        <Typography variant="h3" gutterBottom>
          {t('title3')}
        </Typography>
        <Typography variant="body2" align="justify" paragraph>
          {t('title3Description')}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('whosEOSCR')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('whosEOSCRParagraph')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('whosEDENIALabs')}
            </Typography>
            <Typography variant="body2" align="justify" paragraph>
              {t('whosEDENIALabsParagraph')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default About

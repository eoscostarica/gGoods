import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'

import Discord from '../../images/assets/discord.svg'
import GitHubIcon from '@material-ui/icons/GitHub'
import EOSCRLogo from '../../images/assets/eoscr-logo.svg'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()
  const { t } = useTranslation('footer')

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box className={classes.sectionBox}>
            <Typography variant="h6" gutterBottom>
              {t('follow')}
            </Typography>
          </Box>
          <Box>
            <Link href="#">
              <IconButton>
                <img src={Discord} alt="discord" />
              </IconButton>
            </Link>
            <Link href="#">
              <IconButton>
                <InstagramIcon className={classes.icon} />
              </IconButton>
            </Link>
            <Link href="#">
              <IconButton>
                <TwitterIcon className={classes.icon} />
              </IconButton>
            </Link>
            <Link href="#">
              <IconButton>
                <FacebookIcon className={classes.icon} />
              </IconButton>
            </Link>
            <Link href="#">
              <IconButton>
                <GitHubIcon className={classes.icon} />
              </IconButton>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            {t('content')}
          </Typography>
          <Link href="#" style={{ color: 'black' }}>
            <Typography variant="body1"> {t('home')} </Typography>
          </Link>
          <Link href="#" style={{ color: 'black' }}>
            <Typography variant="body1"> {t('organizations')} </Typography>
          </Link>
          <Link href="#" style={{ color: 'black' }}>
            <Typography variant="body1"> {t('goods')} </Typography>
          </Link>
          <Link href="#" style={{ color: 'black' }}>
            <Typography variant="body1"> {t('games')} </Typography>
          </Link>
          <Link href="#" style={{ color: 'black' }}>
            <Typography variant="body1"> {t('myCollection')} </Typography>
          </Link>
          <Link href="#" style={{ color: 'black' }}>
            <Typography variant="body1"> {t('about')} </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            {t('about')}
          </Typography>
          <Typography variant="body1"> {t('description')} </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box className={classes.centerBox}>
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src={EOSCRLogo} className={classes.logo} alt="eoscr logo" />
            </a>
          </Box>
          <Typography variant="body1" align="center">
            EOS Costa Rica - 2021
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(Footer)

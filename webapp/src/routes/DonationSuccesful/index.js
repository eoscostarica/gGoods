import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'

import Donation from '../../images/assets/donation.png'
import styles from './styles'

const useStyles = makeStyles(styles)

const DonationSuccesful = () => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('donationSuccesfulRoute')

  const handleNavigate = url => () => {
    history.push(url)
  }

  return (
    <Box className={classes.mainBox}>
      <Box className={clsx(classes.sectionBox, classes.displayInlineCenter)}>
        <Box className={classes.orgWrapper}>
          <img alt="success" src={Donation} />
          <Typography>{t('success')}</Typography>
        </Box>
      </Box>
      <Box className={classes.sectionBox}>
        <Typography variant="h5" gutterBottom>
          {t('title1')}
        </Typography>
        <Typography variant="body1">{t('paragraph1')}</Typography>
        <Typography
          variant="h6"
          align="center"
          className={classes.centerMessage}
        >
          {t('lineMessage')}
        </Typography>
      </Box>
      <Box className={classes.sectionBox}>
        <Typography variant="h5" gutterBottom>
          {t('title2')}
        </Typography>
        <Box className={classes.displayInline}>
          <Box
            className={classes.optionsWrapper}
            onClick={handleNavigate('/your-collection')}
          >
            <ArrowForwardIosIcon />
            <Typography>{t('option1')}</Typography>
          </Box>
          <Box
            className={classes.optionsWrapper}
            onClick={handleNavigate('/games')}
          >
            <ArrowForwardIosIcon />
            <Typography>{t('option2')}</Typography>
          </Box>
          <Box
            className={classes.optionsWrapper}
            onClick={handleNavigate('/goods')}
          >
            <ArrowForwardIosIcon />
            <Typography>{t('option3')}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

DonationSuccesful.propTypes = {}

export default DonationSuccesful

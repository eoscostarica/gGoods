import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FilledInput from '@material-ui/core/FilledInput'
import Button from '@material-ui/core/Button'

import styles from './styles'
import { CardAvatar } from '../Card'

const useStyles = makeStyles(styles)

const DonateNow = ({ open, handlerOpen }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { t } = useTranslation('donteRoute')

  return (
    <Dialog
      open={open}
      onClose={handlerOpen}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Box className={classes.dialog}>
        <Box className={classes.closeIcon}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handlerOpen}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography variant="h6" gutterBottom>
            {t('title')}
          </Typography>
          <Typography variant="body1">{t('paragraph1')}</Typography>
        </Box>
        <Box className={classes.sectionBox}>
          <Grid container justify="center">
            <Grid item xs={8}>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {t('selectedGood')}
              </Typography>
              <CardAvatar />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBoxDouble}>
          <Grid container justify="center">
            <Grid item xs={8}>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {t('suggestedPrice')}
              </Typography>
              <Box className={classes.sectionBox}>
                <Chip label="Basic" color="primary" className={classes.chip} />
                <Chip label="Basic" color="primary" className={classes.chip} />
              </Box>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Amount
                </InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange('amount')}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBox}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Button
                variant="contained"
                color="primary"
                className={classes.googleButton}
              >
                Google pay
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.paypalButton}
              >
                Paypal
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.mainButton}
              >
                EOS WALLET
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}

DonateNow.propTypes = {
  open: PropTypes.bool,
  handlerOpen: PropTypes.func
}

export default DonateNow

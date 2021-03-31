import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import styles from './styles'
import { CardAvatar } from '../Card'

const useStyles = makeStyles(styles)

const PublishGood = ({ open, handlerOpen }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { t } = useTranslation('publishGood')

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
        <Box className={classes.sectionBoxDouble}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <CardAvatar name={'Lola the Jaguar'} />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBox}>
          <TextField
            label={t('amount')}
            variant="filled"
            className={classes.textField}
          />
          <TextField
            label={t('suggestedPrice')}
            variant="filled"
            className={classes.textField}
          />
        </Box>
        <Box className={classes.sectionBox}>
          <Button
            variant="contained"
            color="primary"
            className={classes.mainButton}
          >
            {t('createGood')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

PublishGood.propTypes = {
  open: PropTypes.bool,
  handlerOpen: PropTypes.func
}

export default PublishGood

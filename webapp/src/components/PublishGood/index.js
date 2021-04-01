import React, { useEffect, useState } from 'react'
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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useMutation } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CardAvatar } from '../Card'
import { PUT_ON_SALE_MUTATION } from '../../gql'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)
const initialValue = {
  quantity: '',
  amount: '',
  donable: false
}

const PublishGood = ({ open, template, onClose }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [putOnSale, { loading }] = useMutation(PUT_ON_SALE_MUTATION)
  const classes = useStyles()
  const { t } = useTranslation('publishGood')
  const [payload, setPayload] = useState()
  const [, { showMessage }] = useSharedState()

  const handlePayloadChange = field => event => {
    setPayload(prev => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async () => {
    try {
      const { data: response } = await putOnSale({
        variables: {
          ...payload,
          template: template.id,
          amount: parseFloat(payload.amount),
          quantity: parseInt(payload.quantity)
        }
      })
      setPayload(initialValue)
      onClose()
      showMessage({
        content: `${t('successMessage')} ${response.sale.assets.join(',')}`
      })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  useEffect(() => {
    setPayload(initialValue)
  }, [])

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            onClick={onClose}
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
              <CardAvatar
                name={template?.name}
                image={template?.image}
                backgroundColor={template?.backgroundColor}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBox}>
          <TextField
            label={t('amount')}
            variant="filled"
            className={classes.textField}
            value={payload?.quantity || ''}
            onChange={handlePayloadChange('quantity')}
          />
          <TextField
            label={t('suggestedDonation')}
            variant="filled"
            className={classes.textField}
            value={payload?.amount || ''}
            onChange={handlePayloadChange('amount')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          <FormControlLabel
            label={t('allowDonation')}
            control={
              <Switch
                checked={payload?.donable || false}
                onChange={(_, value) =>
                  handlePayloadChange('donable')({ target: { value } })
                }
                color="primary"
              />
            }
          />
        </Box>
        <Box className={classes.sectionBox}>
          <Button
            variant="contained"
            color="primary"
            className={classes.mainButton}
            onClick={handleSubmit}
            disabled={
              loading || !template?.id || !payload?.amount || !payload?.quantity
            }
          >
            {!loading && t('createGood')}
            {loading && <CircularProgress />}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}

PublishGood.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  template: PropTypes.any
}

export default PublishGood

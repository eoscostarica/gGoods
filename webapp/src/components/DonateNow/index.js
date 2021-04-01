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
import { PayPalButton } from 'react-paypal-button-v2'
import { useMutation } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CardAvatar } from '../Card'
import { paypalClientId } from '../../config/paypal.config'
import { CONFIRM_SALE_WITH_PAYPAL } from '../../gql'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const DonateNow = ({ open, handlerOpen }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation('donateRoute')
  const [, { showMessage }] = useSharedState()
  const [confirmSaleWithPaypal, { loading }] = useMutation(
    CONFIRM_SALE_WITH_PAYPAL
  )
  const [{ ggoodOnSaleSelected }] = useSharedState()

  const handleOnSucces = async (details, data) => {
    try {
      await confirmSaleWithPaypal({
        variables: {
          orderId: data.orderID
        }
      })
      showMessage({ type: 'success', content: t('sucessMessage') })
      handlerOpen(false)
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handleOnError = error => {
    showMessage({ type: 'error', content: error.message })
  }

  const handleOnCreateOrder = (data, actions) => {
    const [amount, currency] = ggoodOnSaleSelected?.amount.split(' ')

    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: 'donation for organization.name', // @todo: get this info from the organization
          amount: {
            currency_code: currency,
            value: amount,
            breakdown: {
              item_total: { value: amount, currency_code: currency }
            }
          },
          items: [
            {
              name: ggoodOnSaleSelected?.name,
              description: ggoodOnSaleSelected?.description || 'ggood',
              sku: ggoodOnSaleSelected?.id,
              unit_amount: {
                currency_code: currency,
                value: amount
              },
              quantity: '1',
              category: 'DIGITAL_GOODS'
            }
          ],
          payee: {
            email_address: 'sb-yeqgj5780647@business.example.com',
            merchant_id: 'Z69NTV3EDWEC2'
          } // @todo: get this info from the organization
        }
      ],
      application_context: {
        brand_name: 'gGoods',
        shipping_preference: 'NO_SHIPPING'
      }
    })
  }

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
              <CardAvatar
                id={ggoodOnSaleSelected?.id}
                name={ggoodOnSaleSelected?.name}
                image={ggoodOnSaleSelected?.image}
                backgroundColor={ggoodOnSaleSelected?.backgroundColor}
              />
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
                <Chip
                  label={ggoodOnSaleSelected?.amount}
                  color="primary"
                  className={classes.chip}
                />
              </Box>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Amount
                </InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        {loading && <CircularProgress />}
        {!loading && (
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
                  className={classes.mainButton}
                >
                  EOS WALLET
                </Button>
                <PayPalButton
                  options={{
                    clientId: paypalClientId
                  }}
                  createOrder={handleOnCreateOrder}
                  onSuccess={handleOnSucces}
                  catchError={handleOnError}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}

DonateNow.propTypes = {
  open: PropTypes.bool,
  handlerOpen: PropTypes.func
}

export default DonateNow

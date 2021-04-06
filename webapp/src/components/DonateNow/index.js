import React, { useEffect, useState } from 'react'
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
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import { PayPalButton } from 'react-paypal-button-v2'
import { useMutation } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'

import { CardAvatar } from '../Card'
import { CONFIRM_SALE_WITH_PAYPAL } from '../../gql'
import { useSharedState } from '../../context/state.context'
import { paypalConfig, mainConfig } from '../../config'
import { getLastChars } from '../../utils'

import styles from './styles'

const useStyles = makeStyles(styles)

const DonateNow = ({ open, handlerOpen, organization, ggood }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation('goodRoute')
  const history = useHistory()
  const [, { showMessage }] = useSharedState()
  const [amount, setAmount] = useState()
  const [minimumAmount, setMinimumAmount] = useState()
  const [confirmSaleWithPaypal, { loading }] = useMutation(
    CONFIRM_SALE_WITH_PAYPAL
  )

  const handleOnSucces = async (details, data) => {
    try {
      const {
        data: {
          ggoods: { items: ggoods }
        }
      } = await confirmSaleWithPaypal({
        variables: {
          orderId: data.orderID
        }
      })
      showMessage({
        type: 'success',
        content: (
          <>
            {t('sucessMessage')}{' '}
            {ggoods.map((ggood, index) => (
              <a
                key={ggood.id}
                href={mainConfig.blockExplorer.replace(
                  '{transaction}',
                  ggood.trxid
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getLastChars(ggood.trxid)}
                {index < ggoods.length - 1 ? ', ' : ''}
              </a>
            ))}
          </>
        )
      })
      handlerOpen(false)
      history.push('/donation-succesful')
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handleOnError = error => {
    showMessage({ type: 'error', content: error.message })
  }

  const handleOnCreateOrder = (data, actions) => {
    const [, currency] = ggood?.amount.split(' ')

    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: `${t('donationFor')} ${organization.name}`.substring(
            0,
            127
          ),
          soft_descriptorstring: `${t('donationFor')} ${
            organization.name
          }`.substring(0, 127),
          amount: {
            currency_code: currency,
            value: amount,
            breakdown: {
              item_total: { value: amount, currency_code: currency }
            }
          },
          items: [
            {
              name: ggood?.metadata.name,
              description: (ggood?.metadata.description || 'gGood').substring(
                0,
                127
              ),
              sku: ggood?.id,
              unit_amount: {
                currency_code: currency,
                value: amount
              },
              quantity: '1',
              category: 'DIGITAL_GOODS'
            }
          ],
          payee: {
            email_address: organization.orgInfo?.paypal?.email,
            merchant_id: organization.orgInfo?.paypal?.merchantId
          }
        }
      ],
      application_context: {
        brand_name: 'gGoods',
        shipping_preference: 'NO_SHIPPING'
      }
    })
  }

  const handleOnChangeAmount = event => {
    if (isNaN(event.target.value)) {
      return
    }

    const [, decimalValue] = event.target.value.split('.')
    if (decimalValue?.length > 2) {
      return
    }

    setAmount(event.target.value)
  }

  useEffect(() => {
    const [amount] = (ggood?.amount || '').split(' ')
    setMinimumAmount(parseFloat(amount))
    setAmount(parseFloat(amount))
  }, [ggood])

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
            {t('modalTitle')}
          </Typography>
          <Typography variant="body1">{t('modalParagraph1')}</Typography>
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
                name={ggood?.metadata.name}
                image={ggood?.metadata.imageSmall}
                backgroundColor={ggood?.metadata.backgroundColor}
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
                {t('suggestedDonation')}
              </Typography>
              <Box className={classes.sectionBox}>
                <Chip
                  label={ggood?.amount}
                  color="primary"
                  className={classes.chip}
                />
              </Box>
              {!!ggood?.donable && (
                <TextField
                  fullWidth
                  variant="filled"
                  value={amount || ''}
                  label={t('amount')}
                  error={amount < minimumAmount}
                  helperText={amount < minimumAmount ? t('errorMessage') : ''}
                  onChange={handleOnChangeAmount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
        {loading && <CircularProgress />}
        {!loading && amount >= minimumAmount && (
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
                  style={{ display: 'none' }}
                  options={{
                    clientId: paypalConfig.clientId
                  }}
                  createOrder={handleOnCreateOrder}
                  onSuccess={handleOnSucces}
                  catchError={handleOnError}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        <Box className={classes.sectionBox}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <dl>
                <dt>
                  <Typography variant="subtitle1">
                    You can pay with a PayPal demo account
                  </Typography>
                </dt>
                <dd>
                  <Typography variant="body1">
                    email: sb-piss85762653@personal.example.com
                  </Typography>
                </dd>
                <dd>
                  <Typography variant="body1">password: +SW$pt8-</Typography>
                </dd>
              </dl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}

DonateNow.propTypes = {
  open: PropTypes.bool,
  handlerOpen: PropTypes.func,
  organization: PropTypes.any,
  ggood: PropTypes.any
}

export default DonateNow

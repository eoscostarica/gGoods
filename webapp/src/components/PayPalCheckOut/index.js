import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { PayPalButton } from 'react-paypal-button-v2'
import { useMutation } from '@apollo/client'

import { COMPLETE_PAYMENT_TRANSACTION } from '../../gql'
import { paypalClientId } from '../../config/paypal.config'
import { useSharedState } from '../../context/state.context'

const PayPalCheckOut = ({
  purchaseDescription,
  totalAmount,
  purchaseItems,
  merchantId,
  payeeEmail
}) => {
  const [, { showMessage }] = useSharedState()
  const orderData = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        description: purchaseDescription,
        payment_instruction: {
          disbursement_mode: 'INSTANT'
        },
        amount: {
          currency_code: 'USD',
          value: totalAmount,
          breakdown: {
            item_total: { value: totalAmount, currency_code: 'USD' }
          }
        },
        items: purchaseItems,
        payee: {
          email_address: payeeEmail,
          merchant_id: merchantId
        }
      }
    ],
    application_context: {
      shipping_preference: 'NO_SHIPPING',
      payment_method: {
        payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
      }
    }
  }

  const [
    completePaymentTransaction,
    {
      data: {
        payment_transaction_complete: completePaymentTransactionResult
      } = {}
    }
  ] = useMutation(COMPLETE_PAYMENT_TRANSACTION)

  useEffect(() => {
    if (completePaymentTransactionResult) {
      // do something when action complete
    }
  }, [completePaymentTransactionResult])

  const onSuccesPay = (details, data) => {
    completePaymentTransaction({
      variables: {
        orderId: data.orderID
      }
    })
  }

  const onError = err => {
    showMessage({ type: 'error', content: err })
  }

  return (
    <Box>
      <PayPalButton
        options={{
          clientId: paypalClientId,
          debug: true
        }}
        createOrder={(data, actions) => {
          console.log(orderData)
          return actions.order.create(orderData)
        }}
        onSuccess={onSuccesPay}
        catchError={onError}
      />
    </Box>
  )
}

PayPalCheckOut.propTypes = {
  merchantId: PropTypes.string,
  payeeEmail: PropTypes.string,
  purchaseDescription: PropTypes.string,
  totalAmount: PropTypes.string,
  purchaseItems: PropTypes.array
}

export default PayPalCheckOut

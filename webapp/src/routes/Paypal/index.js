import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import PayPalCheckOut from '../../components/PayPalCheckOut'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Paypal = () => {
  const classes = useStyles()
  const [requestData, setRequestData] = useState({})
  const exampleItems = [
    {
      name: 'NTF Token',
      unit_amount: {
        currency_code: 'USD',
        value: '10'
      },
      quantity: '1',
      description: 'Jaguar - Aniaml Rescue NFT',
      category: 'DIGITAL_GOODS'
    }
  ]

  useEffect(() => {
    setRequestData({
      description: 'NTF Purchase',
      amount: '10',
      merchantId: 'R6USBUPAWM3H2',
      payeeEmail: 'sb-mvix75395025@business.example.com'
    })
  }, [])

  const handleRequestChange = field => e => {
    setRequestData({ ...requestData, [field]: e.target.value })
  }

  return (
    <Box>
      <TextField
        className={classes.textField}
        label="Description"
        variant="outlined"
        value={requestData.description || ''}
        onChange={handleRequestChange('description')}
      />
      <TextField
        className={classes.textField}
        label="Amount"
        variant="outlined"
        value={requestData.amount}
        onChange={handleRequestChange('amount')}
      />
      <Divider className={classes.divider} />
      <TextField
        className={classes.textField}
        label="Merchant id"
        variant="outlined"
        value={requestData.merchantId || ''}
        onChange={handleRequestChange('merchantId')}
      />
      <TextField
        className={classes.textField}
        label="Payee email"
        variant="outlined"
        value={requestData.payeeEmail || ''}
        onChange={handleRequestChange('payeeEmail')}
      />
      <TextField
        variant="outlined"
        label="Items"
        className={classes.textField}
        multiline
        disabled
        value={JSON.stringify(exampleItems, ' ', 2) || ''}
      />
      {requestData.merchantId && requestData.payeeEmail && requestData.amount && (
        <Box className={classes.payPalCheckOut}>
          <PayPalCheckOut
            purchaseDescription={requestData.description}
            totalAmount={requestData.amount}
            purchaseItems={exampleItems}
            merchantId={requestData.merchantId}
            payeeEmail={requestData.payeeEmail}
          />
        </Box>
      )}
    </Box>
  )
}

Paypal.propTypes = {}

export default Paypal

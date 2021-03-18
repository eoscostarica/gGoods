const paymentTransactionHandler = require('./payment-transaction-complete.hanlder')
const paymentTransactionValidation = require('./payment-transaction-complete.validation')

module.exports = {
  method: 'POST',
  path: '/api/payment-transaction-complete',
  handler: paymentTransactionHandler,
  options: {
    validate: paymentTransactionValidation,
    auth: false
  }
}

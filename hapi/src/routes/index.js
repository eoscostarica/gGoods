const healthzRoute = require('./healthz.route')
const paymentTransactionRoute = require('./payment-transaction-complete/payment-transaction-complete.route')

module.exports = [healthzRoute, paymentTransactionRoute]

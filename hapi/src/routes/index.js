const createTemplateRoute = require('./create-template.route')
const healthzRoute = require('./healthz.route')
const paymentTransactionRoute = require('./payment-transaction-complete/payment-transaction-complete.route')

module.exports = [createTemplateRoute, healthzRoute, paymentTransactionRoute]

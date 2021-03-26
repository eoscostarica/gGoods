const createTemplateRoute = require('./create-template.route')
const healthzRoute = require('./healthz.route')
const nftOnSaleRoute = require('./nft-on-sale.route')
const paymentTransactionRoute = require('./payment-transaction-complete.route')
const putOnSaleRoute = require('./put-on-sale.route')

module.exports = [
  createTemplateRoute,
  healthzRoute,
  nftOnSaleRoute,
  paymentTransactionRoute,
  putOnSaleRoute
]

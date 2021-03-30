const createAccountRoute = require('./create-account/create-account.route')
const createAccountOrganization = require('./create-account-organization/create-account-organization.route')
const preRegisterOrganization = require('./pre-register-organization/pre-register-organization.route')
const verifyEmailRouteRoute = require('./verify-email/verify-email.route')
const loginRoute = require('./login/login.route')
const createTemplateRoute = require('./create-template.route')
const healthzRoute = require('./healthz.route')
const nftOnSaleRoute = require('./nft-on-sale.route')
const paymentTransactionRoute = require('./payment-transaction-complete.route')
const putOnSaleRoute = require('./put-on-sale.route')
const credentialsRecovery = require('./credentials-recovery/credentials-recovery.route')
const changePassword = require('./change-password/change-password.route')

module.exports = [
  healthzRoute,
  createAccountRoute,
  createAccountOrganization,
  preRegisterOrganization,
  verifyEmailRouteRoute,
  loginRoute,
  createTemplateRoute,
  nftOnSaleRoute,
  paymentTransactionRoute,
  putOnSaleRoute,
  credentialsRecovery,
  changePassword
]

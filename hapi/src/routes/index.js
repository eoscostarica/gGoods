const confirmSaleWithPaypalRoute = require('./confirm-sale-with-paypal.route')
const createTemplateRoute = require('./create-template.route')
const ggoodsOnSaleRoute = require('./ggoods-on-sale.route')
const healthzRoute = require('./healthz.route')
const myGGoodsRoute = require('./my-ggoods.route')
const putOnSaleRoute = require('./put-on-sale.route')
const createAccountRoute = require('./create-account/create-account.route')
const createAccountOrganization = require('./create-account-organization/create-account-organization.route')
const preRegisterOrganization = require('./pre-register-organization/pre-register-organization.route')
const verifyEmailRouteRoute = require('./verify-email/verify-email.route')
const loginRoute = require('./login/login.route')
const credentialsRecovery = require('./credentials-recovery/credentials-recovery.route')
const changePassword = require('./change-password/change-password.route')

module.exports = [
  confirmSaleWithPaypalRoute,
  createTemplateRoute,
  ggoodsOnSaleRoute,
  healthzRoute,
  myGGoodsRoute,
  putOnSaleRoute,
  createAccountRoute,
  createAccountOrganization,
  preRegisterOrganization,
  verifyEmailRouteRoute,
  loginRoute,
  credentialsRecovery,
  changePassword
]

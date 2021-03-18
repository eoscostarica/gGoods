const createAccountOrganizationHandler = require('./create-account-organization.handler')
const createAccountOrganizationValidation = require('./create-account-organization.validation')

module.exports = {
  method: 'POST',
  path: '/api/create-account-organization',
  handler: createAccountOrganizationHandler,
  options: {
    validate: createAccountOrganizationValidation,
    auth: false
  }
}

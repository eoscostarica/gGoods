const createPreRegisterHandler = require('./pre-register-organization.handler')
const createPreRegisterValidation = require('./pre-register-organization.validation')

module.exports = {
  method: 'POST',
  path: '/api/pre-register',
  handler: createPreRegisterHandler,
  options: {
    validate: createPreRegisterValidation,
    auth: false
  }
}

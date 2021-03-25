const Joi = require('joi')

const { paymentComplete } = require('../services')

module.exports = {
  method: 'POST',
  path: '/payment-transaction-complete',
  handler: ({ payload: { input } }) => paymentComplete.newTransaction(input),
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          orderId: Joi.string().required()
        }).required()
      }).options({ stripUnknown: true })
    }
  }
}

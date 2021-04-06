const Joi = require('joi')

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/put-on-sale',
  handler: ({ auth: { credentials }, payload: { input } }) =>
    nftService.putOnSale(credentials, input),
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          template: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
          amount: Joi.number().min(0).required(),
          donable: Joi.bool().optional()
        }).required()
      }).options({ stripUnknown: true })
    }
  }
}

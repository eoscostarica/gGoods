const Joi = require('joi')

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/put-on-sale',
  handler: ({ payload: { input } }) => nftService.putOnSale(input),
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
    },
    // TODO: ENABLED AUTH HERE
    auth: false
  }
}

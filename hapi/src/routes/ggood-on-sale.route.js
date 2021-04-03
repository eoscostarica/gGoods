const Joi = require('joi')

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/ggood-on-sale',
  handler: ({ payload: { input } }) => nftService.ggoodOnSale(input.id),
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          id: Joi.number().required()
        }).optional()
      }).options({ stripUnknown: true })
    },
    auth: false
  }
}

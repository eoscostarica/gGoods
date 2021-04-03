const Joi = require('joi')

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/ggoods-on-sale',
  handler: ({ payload: { input } }) => nftService.ggoodsOnSale(input),
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          seller: Joi.string().allow('').optional(),
          limit: Joi.number().optional().default(100)
        }).optional()
      }).options({ stripUnknown: true })
    },
    auth: false
  }
}

const Joi = require('joi')

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/nft-on-sale',
  handler: ({ payload: { input } }) => nftService.nftOnSale(input),
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          seller: Joi.string().allow('').optional()
        }).optional()
      }).options({ stripUnknown: true })
    },
    auth: false
  }
}

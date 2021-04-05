const Joi = require('joi')

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/my-ggoods',
  handler: ({ auth: { credentials }, payload: { input } }) =>
    nftService.myGGoods(credentials, input),
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          limit: Joi.number().optional().default(100)
        }).optional()
      }).options({ stripUnknown: true })
    }
  }
}

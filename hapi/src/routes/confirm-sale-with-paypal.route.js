const Joi = require('joi')

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/confirm-sale-with-paypal',
  handler: ({ auth: { credentials }, payload: { input } }) => {
    console.log('here')
    return nftService.confirmSaleWithPaypal(credentials, input)
  },
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

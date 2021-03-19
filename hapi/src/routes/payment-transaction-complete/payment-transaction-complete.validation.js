const Joi = require('joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      orderId: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}

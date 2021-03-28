const Joi = require('joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      account: Joi.string().required(),
      secret: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}

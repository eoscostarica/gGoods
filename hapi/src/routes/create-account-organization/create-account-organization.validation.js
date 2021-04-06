const Joi = require('joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      email: Joi.string().required(),
      emailContent: Joi.object().required(),
      name: Joi.string().required(),
      verification_code: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}

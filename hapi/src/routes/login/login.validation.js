const Joi = require('joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      account: Joi.string().required(),
      passwordPlainText: Joi.string().required()
    })
  }).options({ stripUnknown: true })
}

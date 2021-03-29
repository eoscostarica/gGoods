const Joi = require('joi')

module.exports = {
  payload: Joi.object({
    input: Joi.object({
      email: Joi.string().required(),
      emailContent: Joi.object().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      description: Joi.string(),
      invitation_code: Joi.string()
    })
  }).options({ stripUnknown: true })
}

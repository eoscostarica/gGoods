const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const { mailUtil } = require('../../utils')
const { userApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const tempSecret = crypto.randomBytes(8).toString('hex')
    const saltRounds = 10

    const encripTempSecret = await new Promise(resolve => {
      bcrypt.hash(tempSecret, saltRounds, function (err, hash) {
        if (!err) resolve(hash)
      })
    })

    const user = await userApi.setSecret(
      { email: { _eq: input.email } },
      encripTempSecret
    )

    if (user.update_user.returning.length > 0) {
      await mailUtil.sendCredentialsRecovery(
        input.email,
        user.update_user.returning[0].account,
        tempSecret,
        input.emailContent.subject,
        input.emailContent.title,
        input.emailContent.message,
        input.emailContent.account,
        input.emailContent.password
      )
    } else {
      throw new Error('The email entered is not associated with any account')
    }

    return {
      success: true
    }
  } catch (error) {
    console.log(error)
    throw new Boom.Boom(error.message, {
      statusCode: BAD_REQUEST
    })
  }
}

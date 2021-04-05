const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { accountApi } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const response = await accountApi.login(input)

    return response
  } catch (error) {
    console.error(error)
    throw new Boom.Boom(error.message, {
      statusCode: BAD_REQUEST
    })
  }
}

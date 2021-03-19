const Boom = require('@hapi/boom')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const organizationApi = require('../../api/organization.api')

module.exports = async ({ payload: { input } }) => {
  try {
    console.log('HAPI, PRE REGISTRO')
    const response = await organizationApi.preRegister(input)
    return response
  } catch (error) {
    return Boom.boomify(error, { statusCode: INTERNAL_SERVER_ERROR })
  }
}

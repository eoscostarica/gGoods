const { paypalConfig } = require('../config')

const axiosUtil = require('./axios.util')

const getAuthorization = async () => {
  const basicAuth = Buffer.from(
    `${paypalConfig.client}:${paypalConfig.secret}`
  ).toString('base64')
  const { data: auth } = await axiosUtil.post(
    `${paypalConfig.api}/v1/oauth2/token`,
    `grant_type=client_credentials`,
    {
      headers: {
        Accept: `application/json`,
        Authorization: `Basic ${basicAuth}`
      }
    }
  )

  return `${auth.token_type} ${auth.access_token}`
}

const getOrder = async orderId => {
  const authorization = await getAuthorization()
  const { data: order } = await axiosUtil.get(
    `${paypalConfig.api}/v2/checkout/orders/${orderId}`,
    {
      headers: {
        Accept: `application/json`,
        Authorization: authorization
      }
    }
  )

  return order
}

module.exports = {
  getOrder
}

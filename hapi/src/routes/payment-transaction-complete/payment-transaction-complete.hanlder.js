const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { paymentTransactionComplete } = require('../../api')

module.exports = async ({ payload: { input } }) => {
  try {
    const res = paymentTransactionComplete.newTransaction(input.orderId)
    return {
      return_status: res
    }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}

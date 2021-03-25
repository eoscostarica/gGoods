const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')
const fetch = require('node-fetch')

const { paypalConfig } = require('../config')

const newTransaction = async payload => {
  try {
    // TODO: do something with payment
    getTransactionData(payload.orderId)

    return {
      return_status: true
    }
  } catch (error) {
    throw new Boom.Boom(error.message, {
      statusCode: BAD_REQUEST
    })
  }
}

const getTransactionData = async orderID => {
  fetch(`${paypalConfig.paypalGetTransactionUrl}${orderID}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${paypalConfig.paypalAccesToken}`
    }
  })
    .then(res => res.json())
    .then(json => console.log(json))
}

module.exports = {
  newTransaction
}

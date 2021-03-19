const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')
const fetch = require('node-fetch')

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
  fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
    method: 'get',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 
      'Bearer A21AALvZsl4rzNhtHdNKyYKkJn4oA2hDPT1XQzl16Gw7WDsRuxcLb92iGh28y0vT7p_tYgIC4hpCUUs7wh_nEpdOsqiOUYzCQ'
    }
  })
  .then(res => res.json())
  .then(json => console.log(json))
}

module.exports = {
  newTransaction
}
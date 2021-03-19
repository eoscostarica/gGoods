const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const newTransaction = async payload => {
  try {
    // TODO: Transfer NTF 
    console.log(payload)
    return {
      return_status: true
    }
  } catch (error) {
    throw new Boom.Boom(error.message, {
      statusCode: BAD_REQUEST
    })
  }
}

module.exports = {
  newTransaction
}
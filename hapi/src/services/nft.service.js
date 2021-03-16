const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { dgoodsUtil } = require('../utils')

const vaultService = require('./vault.service')

const createTemplate = async payload => {
  try {
    // TODO: get account from the current user
    const account = 'animalrescue'
    const password = await vaultService.getSecret(account)
    const transaction = await dgoodsUtil.create(account, password, payload)

    return {
      trxid: transaction.transaction_id
    }
  } catch (error) {
    throw new Boom.Boom(error.message, {
      statusCode: BAD_REQUEST
    })
  }
}

module.exports = {
  createTemplate
}

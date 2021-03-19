const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { dgoodsUtil, hasuraUtil } = require('../utils')

const vaultService = require('./vault.service')

const saveTemplate = async payload => {
  const mutation = `
    mutation ($payload: template_insert_input!) {
      template: insert_template_one(object: $payload) {
        id
      }
    }
    `
  const { template } = await hasuraUtil.request(mutation, {
    payload
  })

  return template
}

const createTemplate = async payload => {
  try {
    // TODO: get account from the current user
    const account = 'animalrescue'
    const password = await vaultService.getSecret(account)
    const transaction = await dgoodsUtil.create(account, password, payload)
    await saveTemplate({
      ...payload,
      account
    })

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

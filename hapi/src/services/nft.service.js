const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { dgoodsUtil, hasuraUtil, ipfsUtil } = require('../utils')

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

const getTemplate = async id => {
  const query = `
    query ($id: uuid!) {
      template: template_by_pk(id: $id) {
        id
        category
        name
        metadata
      }
    }
  `
  const { template } = await hasuraUtil.request(query, {
    id
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

const putOnSale = async payload => {
  try {
    // TODO: get account from the current user
    const account = 'animalrescue'
    const password = await vaultService.getSecret(account)
    const template = await getTemplate(payload.template)
    const assets = []

    for (let index = 0; index < payload.quantity; index++) {
      const { path: relativeUri } = await ipfsUtil.add(
        JSON.stringify({
          ...template.metadata,
          createdAt: new Date()
        })
      )
      const transaction = await dgoodsUtil.issue(account, password, {
        category: template.category,
        name: template.name,
        memo: payload.memo,
        relativeUri
      })

      const actionTraces = transaction.processed.action_traces.find(
        item => item.act.name === 'issue'
      )
      const inlineTraces = actionTraces.inline_traces.find(
        item => item.act.name === 'logcall'
      )
      const id = inlineTraces.act.data.dgood_id

      await dgoodsUtil.listsalenft(account, password, {
        assets: [id],
        amount: payload.amount,
        donable: payload.donable
      })
      assets.push(id)
    }

    return {
      assets
    }
  } catch (error) {
    throw new Boom.Boom(error.message, {
      statusCode: BAD_REQUEST
    })
  }
}

module.exports = {
  createTemplate,
  putOnSale
}

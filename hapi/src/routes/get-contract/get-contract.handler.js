const Boom = require('@hapi/boom')
const { BAD_REQUEST } = require('http-status-codes')

const { eosUtil } = require('../../utils')

module.exports = async ({ payload: { input } }) => {
  try {
    const { abi = {} } = await eosUtil.getAbi(input.name)
    const { code_hash: hash = '' } = await eosUtil.getCodeHash(input.name)

    return { abi, hash, name: input.name }
  } catch (error) {
    console.error(error)
    return Boom.boomify(error, { statusCode: BAD_REQUEST })
  }
}

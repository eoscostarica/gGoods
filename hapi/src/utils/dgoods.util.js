const { eosConfig } = require('../config')

const eosUtil = require('./eos.util')

const create = async (
  account,
  password,
  {
    category,
    name,
    fungible = false,
    burnable = false,
    sellable = true,
    transferable = false,
    supply = 1
  }
) => {
  const transaction = await eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          },
          {
            actor: eosConfig.dgoodsAccount,
            permission: 'active'
          }
        ],
        account: eosConfig.dgoodsAccount,
        name: 'create',
        data: {
          category,
          fungible,
          burnable,
          sellable,
          transferable,
          token_name: name,
          issuer: account,
          rev_partner: account,
          rev_split: 0,
          base_uri: 'https://ipfs.io/ipfs/',
          max_issue_days: 0,
          max_supply: `${supply} ${eosConfig.dgoodsToken}`
        }
      }
    ],
    [
      {
        account,
        password
      },
      {
        account: eosConfig.dgoodsAccount,
        password: eosConfig.dgoodsPassword
      }
    ]
  )

  return transaction
}

module.exports = {
  create
}

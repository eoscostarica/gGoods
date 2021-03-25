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
    maxIssueDays = 365,
    supply = 0
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
          base_uri: `${eosConfig.ipfsUrl}/ipfs/`,
          max_issue_days: maxIssueDays,
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

const issue = async (
  account,
  password,
  { to, category, name, quantity = 1, relativeUri, memo = '' }
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
        name: 'issue',
        data: {
          category,
          memo,
          quantity: `${quantity} ${eosConfig.dgoodsToken}`,
          to: to || account,
          token_name: name,
          relative_uri: relativeUri
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

const listsalenft = async (
  account,
  password,
  { assets, amount, donable = false, sellByDays = 365 }
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
        name: 'listsalenft',
        data: {
          seller: account,
          dgood_ids: assets,
          sell_by_days: sellByDays,
          is_donable: donable,
          net_sale_amount: `${amount.toFixed(2)} ${eosConfig.dgoodsCurrency}`
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
  create,
  issue,
  listsalenft
}

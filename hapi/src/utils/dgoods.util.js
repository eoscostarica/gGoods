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

const confirmsale = async (account, password, { newowner, quantity, id }) => {
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
        name: 'confirmsale',
        data: {
          batch_id: id,
          owner: account,
          newowner,
          quantity
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

const asksTableRows = async ({ seller, limit = 100 }) => {
  let filter = {
    limit,
    json: true,
    code: eosConfig.dgoodsAccount,
    scope: eosConfig.dgoodsAccount,
    table: 'asks'
  }

  if (seller) {
    filter = {
      ...filter,
      index_position: 2,
      key_type: 'name',
      lower_bound: seller,
      upper_bound: seller
    }
  }

  const { rows } = await eosUtil.getTableRows(filter)

  return rows
}

const asksTableRowById = async id => {
  const { rows } = await eosUtil.getTableRows({
    limit: 1,
    json: true,
    code: eosConfig.dgoodsAccount,
    scope: eosConfig.dgoodsAccount,
    table: 'asks',
    lower_bound: id,
    upper_bound: id
  })

  return rows?.length ? rows[0] : null
}

const dgoodTableRowsByOwner = async ({ owner, limit = 100 }) => {
  if (!owner) {
    return []
  }

  const { rows } = await eosUtil.getTableRows({
    limit,
    json: true,
    code: eosConfig.dgoodsAccount,
    scope: eosConfig.dgoodsAccount,
    table: 'dgood',
    index_position: 2,
    key_type: 'name',
    lower_bound: owner,
    upper_bound: owner
  })

  return rows
}

const dgoodTableRowById = async id => {
  let filter = {
    limit: 1,
    json: true,
    code: eosConfig.dgoodsAccount,
    scope: eosConfig.dgoodsAccount,
    table: 'dgood'
  }

  if (id) {
    filter = {
      ...filter,
      lower_bound: id,
      upper_bound: id
    }
  }

  const { rows } = await eosUtil.getTableRows(filter)

  return rows[0]
}

const dgoodstatsTableRowByCategoryAndName = async ({ category, name }) => {
  let filter = {
    limit: 1,
    json: true,
    code: eosConfig.dgoodsAccount,
    scope: category,
    table: 'dgoodstats'
  }

  if (name) {
    filter = {
      ...filter,
      lower_bound: name,
      upper_bound: name
    }
  }

  const { rows } = await eosUtil.getTableRows(filter)

  return rows[0]
}

module.exports = {
  create,
  issue,
  listsalenft,
  confirmsale,
  asksTableRows,
  asksTableRowById,
  dgoodTableRowsByOwner,
  dgoodTableRowById,
  dgoodstatsTableRowByCategoryAndName
}

const { eosConfig } = require('../config')

const eosUtil = require('./eos.util')

const watchAccounts = [eosConfig.dgoodsAccount]
const watcher = eosConfig.dgoodsAccount

async function init() {
  try {
    for (const account of watchAccounts) {
      console.log(account)

      const existingCPU = (await eosUtil.getAccount(account)).cpu_limit
        .available
      console.log('Existing CPU:', Number(existingCPU).toLocaleString())

      if (existingCPU > 4000) continue

      const transact = await eosUtil.transact
        .transact(
          [
            {
              account: 'eosio',
              name: 'powerup',
              authorization: [{ actor: watcher, permission: 'active' }],
              data: {
                payer: watcher,
                receiver: account,
                days: 1,
                net_frac: 50000,
                cpu_frac: 30000000000,
                max_payment: '10.0000 EOS'
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
        .catch(er => console.log(er.toString()))

      if (transact) console.log(transact)

      const cpuAfter = (await eosUtil.getAccount(account)).cpu_limit.available
      console.log('cpuAfter:', Number(cpuAfter).toLocaleString(), '\n')
    }
  } catch (error) {
    console.error(error)
  }
}
init()

const { nftService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/my-ggoods',
  handler: ({ auth: { credentials } }) => nftService.myGGoods(credentials)
}

const IpfsHttpClient = require('ipfs-http-client')

const { eosConfig } = require('../config')

const ipfs = IpfsHttpClient({
  url: eosConfig.ipfsUrl
})

module.exports = ipfs

import IpfsHttpClient from 'ipfs-http-client'

const { mainConfig } = require('../config')

export const ipfs = IpfsHttpClient({
  url: mainConfig.ipfsUrl
})

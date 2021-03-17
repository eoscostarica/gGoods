const { GraphQLClient } = require('graphql-request')
const { hasuraConfig } = require('../config')
console.log('asuraConfig:', hasuraConfig)
module.exports = new GraphQLClient(hasuraConfig.url, {
  headers: {
    'x-hasura-admin-secret': hasuraConfig.adminSecret
  }
})

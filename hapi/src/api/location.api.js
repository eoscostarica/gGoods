const { hasuraUtil } = require('../utils')

const INSERT = `
  mutation location($location: location_insert_input!) {
    insert_location_one(object: $location) {
      id
      name
      geolocation
      type
    }
  }
`

const UPDATE = `
  mutation location($account: String!, $location: location_set_input!) {
    update_location(where: {account: {_eq: $account}}, _set: $location) {
      affected_rows
    }
  }
`

const VERIFY_EXISTENCE = `
  query verify($account: String!) {
    location(where: {account: {_eq: $account}}) {
      location_type {
        locations_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`

const insert = location => hasuraUtil.request(INSERT, { location })

const verifyExistence = account =>
  hasuraUtil.request(VERIFY_EXISTENCE, { account })

const update = (account, location) =>
  hasuraUtil.request(UPDATE, { account, location })

module.exports = {
  insert,
  verifyExistence,
  update
}

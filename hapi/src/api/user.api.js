const { hasuraUtil } = require('../utils')

const GET_ONE = `
  query ($where: user_bool_exp) {
    user(where: $where, limit: 1) {
      id
      role
      username
      secret
      account
      email
      name
    }
  }
`

const GET_ONE_PRE_REGISTER = `
  query ($where: preregister_organization_bool_exp) {
    preregister_organization(where: $where, limit: 1) {
      id
      password
      email
      name
    }
  }
`

const INSERT = `
  mutation ($user: user_insert_input!) {
    insert_user_one(object: $user) {
      id
      role
      username
      account
      email
      name,
      verification_code
    }
  }
`

const SET_EMAIL = `
  mutation ($where: user_bool_exp!, $email: String) {
    update_user(where: $where, _set: { email: $email }) {
      affected_rows
    }
  }
`

const SET_NAME = `
  mutation ($where: user_bool_exp!, $name: String) {
    update_user(where: $where, _set: { name: $name }) {
      affected_rows
    }
  }
`

const SET_EMAIL_VERIFIED = `
  mutation ($where: user_bool_exp!) {
    update_user(where: $where, _set: { email_verified: true }) {
      affected_rows
    }
  }
`

const SET_SECRET = `
  mutation ($where: user_bool_exp!, $secret: String!) {
    update_user(where: $where, _set: {secret: $secret}) {
      returning {
        account
      }
    }
  }
`

const getOne = async (where = {}) => {
  const { user } = await hasuraUtil.request(GET_ONE, { where })

  if (user && user.length > 0) return user[0]

  return null
}

const getOnePreRegister = async (where = {}) => {
  const { preregister_organization: preRegister } = await hasuraUtil.request(
    GET_ONE_PRE_REGISTER,
    {
      where
    }
  )

  if (preRegister && preRegister.length > 0) return preRegister[0]

  return null
}

const insert = user => {
  return hasuraUtil.request(INSERT, { user })
}

const setEmail = (where, email) => {
  return hasuraUtil.request(SET_EMAIL, { where, email })
}

const setName = (where, name) => {
  return hasuraUtil.request(SET_NAME, { where, name })
}

const setSecret = (where, secret) => {
  return hasuraUtil.request(SET_SECRET, { where, secret })
}

const verifyEmail = where => {
  return hasuraUtil.request(SET_EMAIL_VERIFIED, { where })
}

module.exports = {
  getOne,
  getOnePreRegister,
  insert,
  setEmail,
  setName,
  verifyEmail,
  setSecret
}

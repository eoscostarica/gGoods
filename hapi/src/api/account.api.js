const { eosConfig } = require('../config')
const { eosUtil, jwtUtil, bcryptjs } = require('../utils')

const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const preRegister = require('./pre-register.api')
const verificationCodeApi = require('./verification-code.api')
const mailApi = require('../utils/mail')
const MAIL_APPROVE_ORGANIZATION = eosConfig.mailApproveOrganization

const create = async ({
  role,
  email,
  emailContent,
  name,
  passwordPlainText
}) => {
  const account = await eosUtil.generateRandomAccountName(role.substring(0, 3))
  const { password, transaction } = await eosUtil.createAccount(account)
  const username = account
  const { verification_code } = await verificationCodeApi.generate()

  const secret = await bcryptjs.hash(passwordPlainText)

  const { insert_user_one: user } = await userApi.insert({
    role,
    username,
    account,
    email,
    secret,
    name,
    verification_code
  })

  await vaultApi.insert({
    account,
    password
  })

  await historyApi.insert(transaction)

  const { access_token: token } = jwtUtil.sign({
    role,
    username,
    account,
    id: user.id
  })

  try {
    mailApi.sendVerificationCode(
      email,
      verification_code,
      emailContent.subject,
      emailContent.title,
      emailContent.message,
      emailContent.button
    )
  } catch (error) {
    console.log(error)
  }

  return {
    account,
    token,
    transaction_id: transaction.transaction_id
  }
}

const createOrganization = async ({
  email,
  emailContent,
  name,
  verification_code
}) => {
  const role = 'organization'
  const account = await eosUtil.generateRandomAccountName(role.substring(0, 3))
  const { password, transaction } = await eosUtil.createAccount(account)
  const username = account

  const { password: secret } = await userApi.getOnePreRegister({
    email: { _eq: email }
  })

  const { insert_user_one: user } = await userApi.insert({
    role,
    username,
    account,
    email,
    secret,
    name,
    verification_code
  })

  await vaultApi.insert({
    account,
    password
  })

  await historyApi.insert(transaction)

  const { access_token: token } = jwtUtil.sign({
    role,
    username,
    account,
    id: user.id
  })

  try {
    mailApi.sendConfirmMessage(
      email,
      emailContent.subject,
      emailContent.title,
      emailContent.message
    )
  } catch (error) {
    console.log(error)
  }

  return {
    account,
    token,
    transaction_id: transaction.transaction_id
  }
}

const verifyEmail = async ({ code }) => {
  const resUser = await userApi.verifyEmail({
    verification_code: { _eq: code }
  })
  const resOrganization = await preRegister.verifyEmail({
    verification_code: { _eq: code }
  })
  let result = false

  if (
    resUser.update_user.affected_rows !== 0 ||
    resOrganization.update_preregister_organization.affected_rows !== 0
  ) {
    if (resOrganization.update_preregister_organization.affected_rows !== 0) {
      try {
        mailApi.sendRegistrationRequest(
          MAIL_APPROVE_ORGANIZATION,
          resOrganization.update_preregister_organization.returning[0]
        )
      } catch (error) {
        console.log(error)
      }
    }
    result = true
  }
  return {
    is_verified: result
  }
}

const login = async ({ account, secret }) => {
  const user = await userApi.getOne({
    _or: [
      { account: { _eq: account } },
      { username: { _eq: account } },
      { email: { _eq: account } }
    ]
  })

  if (!user) {
    throw new Error('Invalid account or secret')
  }

  const { access_token: token } = jwtUtil.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    account: user.account,
    role: user.role,
    username: user.username
  })

  return {
    token
  }
}

module.exports = {
  create,
  createOrganization,
  login,
  verifyEmail
}

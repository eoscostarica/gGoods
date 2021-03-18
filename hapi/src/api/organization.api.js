const { lifebankcodeUtils } = require('../utils')
const { eosConfig } = require('../config')

const accountApi = require('./account.api')
const historyApi = require('./history.api')
const userApi = require('./user.api')
const vaultApi = require('./vault.api')
const locationApi = require('./location.api')
const preregisterApi = require('./pre-register.api')
const verificationCodeApi = require('./verification-code.api')
const mailApi = require('../utils')

const {
  constants: {
    ENUM_DATA: { LOCATION_TYPES }
  }
} = require('../config')

const ORGANIZATION_CODE = eosConfig.lifebankCodeContractName

const preRegister = async ({
  email,
  phone,
  address,
  name,
  password,
  description,
  invitation_code
}) => {
  const { verification_code } = await verificationCodeApi.generate()
  let resultRegister = 'ok'
  console.log('esta aqui')
  try {
    await preregisterApi.insertOrganization({
      email,
      password,
      name,
      address,
      phone,
      description,
      invitation_code,
      verification_code
    })
    console.log('PASA')
    mailApi.mailUtils.sendVerificationCode(
      email,
      verification_code,
      emailContent.subject,
      emailContent.title,
      emailContent.message,
      emailContent.button
    )
  } catch (error) {
    resultRegister = 'error'

    return {
      resultRegister
    }
  }

  return {
    resultRegister
  }
}

const editProfile = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(account)
  const addSponsorTransaction = await lifebankcodeUtils.upLifebank(
    account,
    password,
    profile
  )

  await historyApi.insert(addSponsorTransaction)
  await userApi.setEmail({ account: { _eq: account } }, profile.email)

  await locationApi.update(account, {
    name: profile.name,
    geolocation: {
      type: 'Point',
      coordinates: [profile.geolocation.longitude, profile.geolocation.latitude]
    },
    type: LOCATION_TYPES.LIFE_BANK,
    info: profile
  })
}

const signup = async (account, profile) => {
  await accountApi.grantConsent(account)

  const password = await vaultApi.getPassword(ORGANIZATION_CODE)
  const addLifebankTransaction = await lifebankcodeUtils.addLifebank(
    ORGANIZATION_CODE,
    password,
    profile
  )
  await historyApi.insert(addLifebankTransaction)
  await userApi.setEmail({ account: { _eq: account } }, profile.email)

  await locationApi.insert({
    account,
    name: profile.name,
    geolocation: {
      type: 'Point',
      coordinates: [profile.geolocation.longitude, profile.geolocation.latitude]
    },
    type: LOCATION_TYPES.LIFE_BANK,
    info: profile
  })
}

module.exports = {
  preRegister,
  editProfile,
  signup
}

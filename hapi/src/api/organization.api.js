const userApi = require('./user.api')
const preregisterApi = require('./pre-register.api')
const verificationCodeApi = require('./verification-code.api')
const mailApi = require('../utils/mail')

const { bcryptjs } = require('../utils')

const preRegister = async ({
  email,
  emailContent,
  phone,
  address,
  name,
  passwordPlainText,
  description,
  invitation_code
}) => {
  const { verification_code } = await verificationCodeApi.generate()
  let resultRegister = 'ok'

  const secret = await bcryptjs.hash(passwordPlainText)

  try {
    await preregisterApi.insertOrganization({
      email,
      password: secret,
      name,
      address,
      phone,
      description,
      invitation_code,
      verification_code
    })

    mailApi.sendVerificationCode(
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

const signup = async (account, profile) => {
  await userApi.setEmail({ account: { _eq: account } }, profile.email)
}

module.exports = {
  preRegister,
  signup
}

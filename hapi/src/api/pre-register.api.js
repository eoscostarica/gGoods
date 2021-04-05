const { hasuraUtil } = require('../utils')

const INSERT_ORGANIZATION = `
  mutation ($preregister_organization: preregister_organization_insert_input!) {
    insert_preregister_organization_one(object: $preregister_organization) {
      email
      password
      name
      address
      phone
      description
      invitation_code,
      verification_code
    }
  }
`

const SET_EMAIL_VERIFIED = `
  mutation ($where: preregister_organization_bool_exp!) {
    update_preregister_organization(where: $where, _set: { email_verified: true }) {
      returning {
        address
        description
        email
        invitation_code
        name
        phone
        verification_code
      }
      affected_rows
    }
  }
`

const VALIDATION_VERIFICATION_CODE = `
  query($verification_code: String!) {
    preregister_organization(where: { verification_code: { _eq: $verification_code } }) {
      verification_code
    }
    user(where: { verification_code: { _eq: $verification_code } }) {
      verification_code
    }
  }
`

const insertOrganization = preregister_organization => {
  return hasuraUtil.request(INSERT_ORGANIZATION, { preregister_organization })
}

const verifyEmail = where => {
  return hasuraUtil.request(SET_EMAIL_VERIFIED, { where })
}

const validationVerificationCode = verification_code => {
  return hasuraUtil.request(VALIDATION_VERIFICATION_CODE, {
    verification_code
  })
}

module.exports = {
  insertOrganization,
  verifyEmail,
  validationVerificationCode
}

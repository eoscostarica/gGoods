const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')

const { jwtConfig } = require('../config')

const sign = ({ id, role, account, orgAccount, orgName, ...payload }) => {
  const sub = typeof id !== 'string' ? id.toString() : id
  let hasuraClaims = {
    'x-hasura-allowed-roles': [role],
    'x-hasura-default-role': role,
    'x-hasura-user-id': sub,
    'x-hasura-user-account': account
  }

  if (orgAccount && orgName) {
    hasuraClaims = {
      ...hasuraClaims,
      'x-hasura-org-account': orgAccount,
      'x-hasura-org-name': orgName
    }
  }

  const accessToken = jwt.sign(
    {
      sub,
      jti: uuid(),
      iss: jwtConfig.iss,
      'https://hasura.io/jwt/claims': hasuraClaims,
      ...payload
    },
    jwtConfig.secret,
    {
      algorithm: jwtConfig.algorithm,
      expiresIn: new Date().getTime() + 3600000
    }
  )

  return {
    access_token: accessToken,
    refresh_token: Buffer.from(uuid()).toString('base64')
  }
}

const registerAuthStrategy = async server => {
  await server.register(require('hapi-auth-jwt2'))

  server.auth.strategy('jwt', 'jwt', {
    key: jwtConfig.secret,
    validate: async decoded => ({
      isValid: true,
      credentials: {
        id: decoded.sub,
        name: decoded.name,
        username: decoded.username,
        email: decoded.email,
        account:
          decoded['https://hasura.io/jwt/claims']['x-hasura-user-account'],
        orgAccount:
          decoded['https://hasura.io/jwt/claims']['x-hasura-org-account'] ||
          null,
        orgName:
          decoded['https://hasura.io/jwt/claims']['x-hasura-org-name'] || null
      }
    }),
    verifyOptions: {
      algorithms: [jwtConfig.algorithm],
      issuer: jwtConfig.iss
    }
  })

  server.auth.default('jwt')
}

module.exports = {
  sign,
  registerAuthStrategy
}

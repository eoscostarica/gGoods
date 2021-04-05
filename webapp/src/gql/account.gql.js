import gql from 'graphql-tag'

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation(
    $role: String!
    $email: String!
    $emailContent: jsonb!
    $name: String!
    $passwordPlainText: String!
  ) {
    create_account(
      role: $role
      email: $email
      emailContent: $emailContent
      name: $name
      passwordPlainText: $passwordPlainText
    ) {
      account
      token
      transaction_id
    }
  }
`

export const CREATE_ACCOUNT_ORGANIZATION_MUTATION = gql`
  mutation(
    $email: String!
    $emailContent: jsonb!
    $name: String!
    $verification_code: String!
  ) {
    create_account_organization(
      email: $email
      emailContent: $emailContent
      name: $name
      verification_code: $verification_code
    ) {
      account
      token
      transaction_id
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation($profile: jsonb!) {
    signup(profile: $profile) {
      success
    }
  }
`

export const CHECK_USERNAME_MUTATION = gql`
  mutation($role: String!, $username: String!) {
    check_username(role: $role, username: $username) {
      is_valid
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation($account: String!, $secret: String!) {
    login(account: $account, secret: $secret) {
      token
    }
  }
`

export const CREDENTIALS_RECOVERY = gql`
  mutation($email: String!, $emailContent: jsonb!) {
    credentials_recovery(email: $email, emailContent: $emailContent) {
      success
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation(
    $email: String!
    $emailContent: jsonb!
    $currentPassword: String!
    $newPassword: String!
  ) {
    change_password(
      email: $email
      emailContent: $emailContent
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      success
    }
  }
`

export const VERIFY_EMAIL = gql`
  mutation($code: String!) {
    verify_email(code: $code) {
      is_verified
    }
  }
`

export const VALIDATE_EMAIL = gql`
  query($email: String!) {
    user(where: { email: { _eq: $email } }) {
      email
    }
  }
`

export const GET_SECRET_BY_ACCOUNT = gql`
  query($account: String!) {
    user(
      where: {
        _or: [
          { account: { _eq: $account } }
          { username: { _eq: $account } }
          { email: { _eq: $account } }
        ]
      }
    ) {
      secret
    }
  }
`

export const GET_USERNAME = gql`
  query($account: String!) {
    user(where: { account: { _eq: $account } }) {
      username
    }
  }
`

export const SET_USERNAME = gql`
  mutation($account: String!, $username: String!) {
    update_user(
      _set: { username: $username }
      where: { account: { _eq: $account } }
    ) {
      affected_rows
    }
  }
`

export const VERIFY_USERNAME = gql`
  query($account: String!, $username: String!) {
    user(where: { username: { _eq: $username }, account: { _neq: $account } }) {
      username
    }
  }
`

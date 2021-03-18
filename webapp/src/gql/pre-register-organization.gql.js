import gql from 'graphql-tag'

export const CREATE_PRE_REGISTER_ORGANIZATION_MUTATION = gql`
  mutation(
    $email: String!
    $emailContent: jsonb!
    $password: String!
    $name: String!
    $address: String!
    $phone: String!
    $description: String!
    $invitation_code: String!
  ) {
    create_pre_register_organization(
      email: $email
      emailContent: $emailContent
      password: $password
      name: $name
      address: $address
      phone: $phone
      description: $description
      invitation_code: $invitation_code
    ) {
      resultRegister
    }
  }
`

export const VALIDATION_EMAIL = gql`
  query($email: String!) {
    preregister_lifebank(where: { email: { _eq: $email } }) {
      email
    }
    user(where: { email: { _eq: $email } }) {
      email
    }
  }
`

export const UPDATE_STATE_LIFEBANK = gql`
  mutation ($verification_code: String!) {
    update_preregister_lifebank( where: { verification_code: { _eq: $verification_code },_and: { state: { _eq: "pending" }}}, _set: { state: "approved" }) {
      returning {
        address
        coordinates
        description
        email
        immunity_test
        invitation_code
        name
        password
        phone
        schedule
        urgency_level
        verification_code
      }
    }
  }
`
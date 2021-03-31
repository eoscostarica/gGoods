import gql from 'graphql-tag'

export const GET_ORGANIZATIONS = gql`
  query {
    preregister_organization {
      address
      description
      email
      invitation_code
      id
      name
      phone
      orgInfo
    }
  }
`

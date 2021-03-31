import gql from 'graphql-tag'

export const GET_ORGANIZATIONS = gql`
  query {
    preregister_organization(where: { state: { _eq: "approved" } }) {
      description
      id
      name
      orgInfo
    }
  }
`

export const GET_ORGANIZATION_BY_ID = gql`
  query($id: Int!) {
    preregister_organization(
      where: { _and: { id: { _eq: $id }, state: { _eq: "approved" } } }
    ) {
      address
      description
      email
      id
      name
      phone
      orgInfo
    }
  }
`

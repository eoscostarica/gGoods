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

export const GET_FEATURED_ORGANIZATIONS = gql`
  query {
    organizations: preregister_organization(
      order_by: { created_at: asc }
      where: { state: { _eq: "approved" } }
      limit: 3
    ) {
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

export const GET_ORGANIZATION_BY_ACCOUNT = gql`
  query($orgInfo: jsonb!) {
    organizations: preregister_organization(
      where: {
        _and: { orgInfo: { _contains: $orgInfo }, state: { _eq: "approved" } }
      }
    ) {
      id
      name
      orgInfo
    }
  }
`

export const GET_ACCOUNT_FROM_ID = gql`
  query($email: String!) {
    user(where: { email: { _eq: $email } }) {
      account
    }
  }
`

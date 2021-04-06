import gql from 'graphql-tag'

export const GET_ORGANIZATIONS = gql`
  query {
    items: preregister_organization(where: { state: { _eq: "approved" } }) {
      description
      id
      name
      orgInfo
    }
  }
`

export const GET_FEATURED_ORGANIZATIONS = gql`
  query {
    items: preregister_organization(
      order_by: { created_at: asc }
      where: { state: { _eq: "approved" } }
      limit: 4
    ) {
      description
      id
      name
      orgInfo
    }
  }
`

export const GET_ORGANIZATIONS_BY_ID = gql`
  query($id: Int!) {
    items: preregister_organization(
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

export const GET_ORGANIZATIONS_BY_ACCOUNT = gql`
  query($orgInfo: jsonb!) {
    items: preregister_organization(
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

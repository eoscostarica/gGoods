import gql from 'graphql-tag'

export const CREATE_TEMPLATE_MUTATION = gql`
  mutation($category: String!, $name: String!, $metadata: jsonb!) {
    template: create_template(
      category: $category
      name: $name
      metadata: $metadata
    ) {
      trxid
    }
  }
`

import gql from 'graphql-tag'

export const CREATE_TEMPLATE_MUTATION = gql`
  mutation($category: String!, $name: String!) {
    template: create_template(category: $category, name: $name) {
      trxid
    }
  }
`

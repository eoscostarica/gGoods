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

export const PUT_ON_SALE_MUTATION = gql`
  mutation put_on_sale(
    $template: uuid!
    $quantity: Int!
    $amount: Float!
    $donable: Boolean
    $memo: String
  ) {
    sale: put_on_sale(
      template: $template
      quantity: $quantity
      amount: $amount
      donable: $donable
      memo: $memo
    ) {
      assets
    }
  }
`

export const TEMPLATES_QUERY = gql`
  query templates($account: String!) {
    templates: template(where: { account: { _eq: $account } }) {
      id
      category
      name
      metadata
    }
  }
`

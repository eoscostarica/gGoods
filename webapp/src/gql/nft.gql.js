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

export const SAVE_NFT_ON_THE_MAP = gql`
  mutation insert_ggoods_map($objects: [ggoods_map_insert_input!]!) {
    insert_ggoods_map(objects: $objects) {
      returning {
        id
      }
    }
  }
`

export const GET_NFT_ON_THE_MAP = gql`
  query {
    ggoods_map {
      good_id
      id
      user_id
      coordinates
    }
  }
`

export const TEMPLATES_QUERY = gql`
  query templates {
    items: template {
      id
      category
      name
      metadata
    }
  }
`

export const GGOODS_ON_SALE = gql`
  query($seller: String) {
    items: goods_on_sale(seller: $seller) {
      id
      seller
      amount
      donable
      expiration
      ggoods
    }
  }
`

export const MY_GGOODS = gql`
  query {
    ggoods: my_ggoods {
      id
      category
      owner
      serial
      metadata
    }
  }
`

export const CONFIRM_SALE_WITH_PAYPAL = gql`
  mutation($orderId: String!) {
    confirm_sale_with_paypal(orderId: $orderId) {
      success
    }
  }
`

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
    ggoods: put_on_sale(
      template: $template
      quantity: $quantity
      amount: $amount
      donable: $donable
      memo: $memo
    ) {
      items: ggoods
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
    items: ggoods_on_sale(seller: $seller) {
      id
      issuer
      owner
      serial
      seller
      amount
      donable
      expiration
      metadata
    }
  }
`

export const GGOOD_ON_SALE = gql`
  query($id: Int!) {
    item: ggood_on_sale(id: $id) {
      id
      issuer
      owner
      serial
      seller
      amount
      donable
      expiration
      metadata
    }
  }
`

export const GET_FEATURED_GGOODS_ON_SALE = gql`
  query {
    items: ggoods_on_sale(limit: 8) {
      id
      issuer
      owner
      serial
      seller
      amount
      donable
      expiration
      metadata
    }
  }
`

export const MY_GGOODS = gql`
  query {
    ggoods: my_ggoods {
      id
      issuer
      owner
      serial
      metadata
    }
  }
`

export const CONFIRM_SALE_WITH_PAYPAL = gql`
  mutation($orderId: String!) {
    ggoods: confirm_sale_with_paypal(orderId: $orderId) {
      items: ggoods
    }
  }
`

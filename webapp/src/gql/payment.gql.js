import gql from 'graphql-tag'

export const COMPLETE_PAYMENT_TRANSACTION = gql`
  mutation($orderId: String!) {
    payment_transaction_complete(orderId: $orderId) {
      return_status
    }
  }
`

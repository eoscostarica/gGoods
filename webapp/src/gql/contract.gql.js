import gql from 'graphql-tag'

export const GET_CONTRACT_QUERY = gql`
  query($name: String!) {
    get_contract(name: $name) {
      name
      hash
      abi
    }
  }
`

export const GET_CONTRACTS_QUERY = gql`
  query {
    ggoodsggoods: get_contract(name: "ggoodsggoods") {
      name
      hash
      abi
    }
  }
`

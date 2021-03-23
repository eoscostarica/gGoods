import React from 'react'
import { render } from 'react-dom'
import { UALProvider, withUAL } from '@eoscostarica/ual-reactjs-renderer'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'
import { client } from './graphql'
import { UserProvider } from './context/user.context'
import * as serviceWorker from './serviceWorker'
import { ualConfig } from './config'
import { SharedStateProvider } from './context/state.context'

const SharedStateProviderWithUAL = withUAL(SharedStateProvider)

render(
  <UALProvider
    chains={[ualConfig.network]}
    authenticators={ualConfig.authenticators}
    appName={ualConfig.appName}
  >
    <SharedStateProviderWithUAL>
      <ApolloProvider client={client}>
        <UserProvider>
          <App />
        </UserProvider>
      </ApolloProvider>
    </SharedStateProviderWithUAL>
  </UALProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

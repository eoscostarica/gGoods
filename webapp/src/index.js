import React from 'react'
import { render } from 'react-dom'
import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'
import { client } from './graphql'
import * as serviceWorker from './serviceWorker'
import './i18n'
import { ualConfig } from './config'

const AppWithUAL = withUAL(App)

render(
  <UALProvider
    chains={[ualConfig.network]}
    authenticators={ualConfig.authenticators}
    appName={ualConfig.appName}
  >
    <ApolloProvider client={client}>
      <AppWithUAL />
    </ApolloProvider>
  </UALProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()

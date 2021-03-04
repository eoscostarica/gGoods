import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import App from './App'
import theme from './theme'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
    <ThemeProvider theme={theme[0]}>
      <App />
    </ThemeProvider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})

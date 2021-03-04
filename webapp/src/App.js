import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { SharedStateProvider } from './context/state.context'
import routes from './routes'
import Loader from './components/Loader'
import DashboardLayout from './layouts/Dashboard'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import { ThemeProvider } from 'styled-components'

import { lightTheme, darkTheme } from './theme'

const App = ({ ual = {} }) => {
  const renderRoutes = ({ children, component, ...props }, index) => {
    if (Array.isArray(children) && children.length > 0) {
      return children.map(renderRoute)
    }

    if (component) {
      return renderRoute({ ...props, component }, index)
    }

    return <></>
  }

  const renderRoute = (
    { name, header, icon, path, component: Component, ...props },
    index
  ) => (
    <Route key={`path-${name}-${index}`} path={path} {...props}>
      <Component ual={ual} {...props} />
    </Route>
  )

  const [theme, setTheme] = useState('light')

  return (
    <SharedStateProvider>
      <BrowserRouter>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DashboardLayout
                  ual={ual}
                  theme={theme}
                  onThemeChange={setTheme}
                >
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      {routes
                        .filter((route) => !route?.path?.includes('http'))
                        .map(renderRoutes)}
                    </Switch>
                  </Suspense>
                </DashboardLayout>
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </SharedStateProvider>
    // <SharedStateProvider>
    //   <BrowserRouter>
    //     <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //       <DashboardLayout ual={ual}>
    //         <Suspense fallback={<Loader />}>
    //           <Switch>
    //             {routes
    //               .filter((route) => !route?.path?.includes('http'))
    //               .map(renderRoutes)}
    //           </Switch>
    //         </Suspense>
    //       </DashboardLayout>
    //     </MuiPickersUtilsProvider>
    //   </BrowserRouter>
    // </SharedStateProvider>
  )
}

App.propTypes = {
  ual: PropTypes.object
}

export default App

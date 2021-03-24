import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'

const SharedStateContext = React.createContext()

const getUserFromToken = (token) => {
  if(!token)
    return

  const claims = jwtDecode(token)
  return {
    account: claims.sub,
    role: claims?.['https://hasura.io/jwt/claims']['x-hasura-default-role']
  }
}

const initialValue = {
  showLoginModal: false,
  useDarkMode: false,
  user: getUserFromToken(localStorage.getItem('token'))
}

const sharedStateReducer = (state, action) => {
  switch (action.type) {
    case 'ual':
      return {
        ...state,
        user: action.ual?.activeUser
      }

    case 'set': {
      return {
        ...state,
        ...action.payload
      }
    }

    case 'showMessage':
      return {
        ...state,
        message: action.payload
      }

    case 'hideMessage':
      return {
        ...state,
        message: null
      }

    case 'login':
      //state.ual.showModal()
      return {
        ...state,
        showLoginModal: true
      }

    case 'logout':
      //state.ual.logout()
      localStorage.removeItem('token')

      return {
        ...state,
        user: null
      }

    case 'cancelLogin':
      return {
        ...state,
        showLoginModal: false
      }
    
    case 'successLogin':
      localStorage.setItem('token', action.payload)

      return {
        ...state,
        user: getUserFromToken(action.payload)
      }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

export const SharedStateProvider = ({ children, ual, ...props }) => {
  const [state, dispatch] = React.useReducer(sharedStateReducer, {
    ...initialValue,
    ual
  })
  const value = React.useMemo(() => [state, dispatch], [state])

  useEffect(() => {
    dispatch({ type: 'ual', ual })
  }, [ual])

  return (
    <SharedStateContext.Provider value={value} {...props}>
      {children}
    </SharedStateContext.Provider>
  )
}

SharedStateProvider.propTypes = {
  children: PropTypes.node,
  ual: PropTypes.any
}

export const useSharedState = () => {
  const context = React.useContext(SharedStateContext)

  if (!context) {
    throw new Error(`useSharedState must be used within a SharedStateContext`)
  }

  const [state, dispatch] = context
  const setState = payload => dispatch({ type: 'set', payload })
  const showMessage = payload => dispatch({ type: 'showMessage', payload })
  const hideMessage = () => dispatch({ type: 'hideMessage' })
  const login = () => dispatch({ type: 'login' })
  const logout = () => dispatch({ type: 'logout' })
  const cancelLogin = () => dispatch({ type: 'cancelLogin' })
  const successLogin = (payload) => dispatch({ type: 'successLogin', payload })

  return [state, { setState, showMessage, hideMessage, login, logout, cancelLogin, successLogin }]
}

import React, { useState, useEffect, useReducer, memo } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { CREATE_ACCOUNT_MUTATION } from '../../gql'

const Home = () => {
  const { t } = useTranslation('homeRoute')
  const [role, setRole] = useState('guest')

  const [user, setUser] = useReducer(
    (user, newUser) => ({ ...user, ...newUser }),
    {}
  )

  const [
    createAccount,
    {
      error: errorcreateAccount,
      loading: createAccountLoading,
      data: { create_account: createAccountResult } = {}
    }
  ] = useMutation(CREATE_ACCOUNT_MUTATION)

  const handleCreateAccount = () => {
    console.log('TESTING')
    createAccount({
      variables: {
        role,
        email: 'leister@gmail.com',
        emailContent: {
          subject: 'a',
          title: 'a',
          message: 'a',
          button: 'a'
        },
        name: 'leister',
        secret: ''
      }
    })
  }

  return (
    <Box>
      <Button onClick={handleCreateAccount} variant="contained">Default</Button>
      <Typography>{t('welcomeMessage')}</Typography>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

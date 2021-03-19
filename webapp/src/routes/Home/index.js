import React, { useState, useEffect, useReducer, memo } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { CREATE_ACCOUNT_MUTATION, CREATE_PRE_REGISTER_ORGANIZATION_MUTATION, CREATE_ACCOUNT_ORGANIZATION_MUTATION } from '../../gql'

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

  const [
    preRegisterOrganization,
    {
      error: errorpreRegisterOrganization,
      loading: preRegisterOrganizationLoading,
      data: { create_pre_register_organization: preRegisterOrganizationResult } = {}
    }
  ] = useMutation(CREATE_PRE_REGISTER_ORGANIZATION_MUTATION)

  const [createAccountOrganization, { error: errorCreateAccount }] = useMutation(CREATE_ACCOUNT_ORGANIZATION_MUTATION)

  const handleCreateAccount = () => {
    console.log('TESTING')
    createAccount({
      variables: {
        role,
        email: 'jaguarrescue@gmail.com',
        emailContent: {
          subject: 'a',
          title: 'a',
          message: 'a',
          button: 'a'
        },
        name: 'leister',
        secret: 'leister'
      }
    })
  }

  const handleCreateAccountOrganization = () => {
    // const { name, email, verification_code } = lifebank
    // const secret = lifebank.password

    createAccountOrganization({
      variables: {
        email: 'leisterac.1997@gmail.com',
        emailContent: {
          subject: 'prueba',
          title: 'Titulo',
          message: 'Prueba',
        },
        name: 'animal rescue',
        secret: 'animal secret rescue',
        verification_code: 'none2'
      }
    })
  }

  const handlePreRegisterOrganization = () => {
    // const {
    //   email,
    //   password,
    //   name,
    //   address,
    //   schedule,
    //   phone,
    //   description,
    //   coordinates
    // } = user
    // let { immunity_test, invitation_code, urgency_level } = user

    // if (immunity_test === undefined) immunity_test = false

    // if (invitation_code === undefined || !invitation_code) invitation_code = ' '

    // if (urgency_level === undefined) urgency_level = 1

    // const bcrypt = require('bcryptjs')
    // const saltRounds = 10

    // bcrypt.hash(password, saltRounds, function (err, hash) {
    // if (!err) {
    preRegisterOrganization({
      variables: {
        email: 'leisterac.1997@gmail.com',
        emailContent: {
          subject: 'Asunto',
          title: 'Titulo',
          message: 'Mensaje',
          button: 'Button Text'
        },
        password: 'testing',
        name: 'new org',
        address: 'testing',
        phone: 'testing',
        description: 'testing',
        invitation_code: 'testing'
      }
    })
    // }
    // })
  }

  return (
    <Box>
      <Button onClick={handleCreateAccount} variant="contained">Create account</Button>
      <Button onClick={handlePreRegisterOrganization} variant="contained">Preregister organization</Button>
      <Button onClick={handleCreateAccountOrganization} variant="contained">Validate organization</Button>
      <Typography>{t('welcomeMessage')}</Typography>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

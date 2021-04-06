import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReCAPTCHA from 'react-google-recaptcha'
import { useTranslation } from 'react-i18next'

import SignupWithGoogle from './socialSingup/SignupWithGoogle'
import { captchaConfig } from '../../config'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    padding: theme.spacing(0, 2)
  },
  textField: {
    marginBottom: 10
  },
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  btnSignup: {
    width: '70%',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}))

const UserSignup = ({
  onSubmit,
  onSubmitWithAuth,
  setField,
  loading,
  isEmailValid,
  children
}) => {
  const { t } = useTranslation('signup')
  const classes = useStyles()
  const [password, setPassword] = useState()
  const [recaptchaValue, serRecaptchaValue] = useState('')
  const [confirmPassword, setConfirmPassword] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirmPassword && confirmPassword !== password) setError(true)
      else setError(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [confirmPassword])

  return (
    <form autoComplete="off" className={classes.form}>
      <Box className={classes.textFieldWrapper}>
        {children}
        <TextField
          id="secret"
          label={t('password')}
          type="password"
          fullWidth
          variant="outlined"
          className={classes.textField}
          onChange={event => {
            setField('secret', event.target.value)
            setPassword(event.target.value)
          }}
        />
        <TextField
          id="confirm-password"
          label={t('confirmPassword')}
          type="password"
          fullWidth
          error={error}
          helperText={error && t('passwordNotMatch')}
          variant="outlined"
          className={classes.textField}
          onChange={event => setConfirmPassword(event.target.value)}
        />
        <ReCAPTCHA
          sitekey={captchaConfig.captchaConfig.sitekey}
          onChange={value => serRecaptchaValue(value)}
        />
      </Box>
      <Box className={classes.btnWrapper}>
        <Button
          disabled={
            !isEmailValid ||
            !password ||
            !confirmPassword ||
            !recaptchaValue ||
            loading ||
            error
          }
          className={classes.btnSignup}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {t('createAccount')}
        </Button>
        {loading && <CircularProgress />}
        <SignupWithGoogle handlerSubmit={onSubmitWithAuth} />
      </Box>
    </form>
  )
}

UserSignup.propTypes = {
  onSubmit: PropTypes.func,
  onSubmitWithAuth: PropTypes.func,
  setField: PropTypes.func,
  loading: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  children: PropTypes.node
}

UserSignup.defaultProps = {}

export default UserSignup

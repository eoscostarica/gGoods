import React, { memo, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'

import {
  LOGIN_MUTATION,
  VALIDATE_EMAIL,
  GET_SECRET_BY_ACCOUNT
} from '../../gql'
import { useSharedState } from '../../context/state.context'
import LoginWithGoogle from './LoginWithGoogle'
import Signup from '../../components/Signup'

const useStyles = makeStyles(theme => ({
  alert: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  dialog: {
    paddingTop: '48px',
    paddingLeft: '48px',
    paddingRight: '48px'
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.18',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 15
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 30
  },
  inputStyle: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    marginBottom: 15
  },
  formCheckBox: {
    marginBottom: 20
  },
  centerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLogin: {
    borderRadius: '50px',
    backgroundColor: '#4DD5EA',
    width: '70%',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  registerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10
  },
  btnLoginModal: {
    borderRadius: '4px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#121212',
    padding: '10px'
  },
  labelOption: {
    color: `${theme.palette.primary.main} !important`,
    marginLeft: theme.spacing(3),
    fontSize: 14,
    textTransform: 'capitalize'
  },
  iconOption: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 20
  },
  registerBtnSideBar: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const LoginModal = () => {
  const { t } = useTranslation('login')
  const [user, setUser] = useState({})
  const [
    { showLoginModal: open },
    { cancelLogin, successLogin }
  ] = useSharedState()
  const [errorMessage, setErrorMessage] = useState(null)
  const classes = useStyles()
  const theme = useTheme()
  const [
    loginMutation,
    { loading, error, data: { login: loginResult } = {} }
  ] = useMutation(LOGIN_MUTATION, { fetchPolicy: 'no-cache' })

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const { refetch: checkEmail } = useQuery(VALIDATE_EMAIL, {
    variables: {
      email: user.email
    },
    skip: true
  })

  const { refetch: getHash } = useQuery(GET_SECRET_BY_ACCOUNT, {
    variables: {
      account: user.email
    },
    skip: true
  })

  const handleOpen = () => {
    cancelLogin()
  }

  const handleSetField = (field, value) => {
    setUser({ ...user, [field]: value })
  }

  const handleLogin = async () => {
    setErrorMessage(null)
    const bcrypt = require('bcryptjs')
    const { data } = await getHash({ account: user.account })

    if (data.user.length >= 1) {
      const hash = data.user[0].secret

      bcrypt.compare(user.secret, hash, function (err, res) {
        if (!err && res) {
          setErrorMessage(null)
          loginMutation({
            variables: {
              account: user.account,
              secret: hash
            }
          })
        } else {
          setErrorMessage(t('invalidAccountOrPassword'))
        }
      })
    } else {
      setErrorMessage(t('invalidAccountOrPassword'))
    }
  }

  const handleLoginWithAuth = async (status, email, secret) => {
    if (status) {
      const { data } = await checkEmail({ email })

      if (data.user.length === 1) {
        const bcrypt = require('bcryptjs')
        const { data } = await getHash({ account: email })
        const hash = data.user[0].secret

        bcrypt.compare(secret, hash, function (err, res) {
          if (!err && res) {
            setErrorMessage(null)
            loginMutation({
              variables: {
                account: email,
                secret: hash
              }
            })
          } else setErrorMessage(t('invalidAccountOrPassword'))
        })
      } else setErrorMessage(t('accountDoesntExist'))
    } else setErrorMessage(t('somethingHappenedWithAuth'))
  }

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message)
    }
  }, [error])

  useEffect(() => {
    if (loginResult) {
      successLogin(loginResult.token)
      cancelLogin()
    }
  }, [loginResult])

  function executeLogin(e) {
    if (e.key === 'Enter' && user.account && user.secret && !loading) {
      e.preventDefault()
      handleLogin()
    }
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        fullScreen={!isDesktop}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box className={classes.dialog}>
          <Box className={classes.closeIcon}>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleOpen}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box>
            <Typography className={classes.title}>
              {t('letsStarted')}
            </Typography>
            <Typography className={classes.subTitle}>
              {t('subtitle')}
            </Typography>
          </Box>
          {errorMessage && (
            <Alert
              className={classes.alert}
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setErrorMessage(null)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {errorMessage}
            </Alert>
          )}
          <form autoComplete="off">
            <Box>
              <TextField
                id="account"
                label={t('email')}
                variant="outlined"
                className={classes.inputStyle}
                onChange={event =>
                  handleSetField(
                    'account',
                    event.target.value.toLowerCase().replace(/\s/g, '')
                  )
                }
                onKeyPress={event => executeLogin(event)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                id="secret"
                label={t('password')}
                type="password"
                variant="outlined"
                className={classes.inputStyle}
                onChange={event => handleSetField('secret', event.target.value)}
                onKeyPress={event => executeLogin(event)}
              />
            </Box>
            <FormControlLabel
              className={classes.formCheckBox}
              control={<Checkbox name="checkLogin" />}
              label={t('loggedIn')}
            />
            <Box className={classes.centerBox}>
              <Button
                id="buttonLogin"
                className={classes.btnLogin}
                disabled={!user.account || !user.secret || loading}
                variant="contained"
                color="secondary"
                onClick={handleLogin}
              >
                {t('login')}
              </Button>
            </Box>
            <Box className={classes.centerBox}>
              {loading && <CircularProgress />}
            </Box>
            <Box className={classes.centerBox}>
              <LoginWithGoogle onSubmit={handleLoginWithAuth} />
            </Box>
          </form>
          <Box className={classes.registerBox}>
            <Signup isModal />
          </Box>
        </Box>
      </Dialog>
    </>
  )
}

LoginModal.defaultProps = {
  isNavBar: false,
  isSideBar: false
}

export default memo(LoginModal)

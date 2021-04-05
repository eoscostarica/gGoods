import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  btn: {
    borderRadius: '50px',
    width: '60%',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    padding: '15px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}))

const SignupRoleSelector = ({ onSubmit }) => {
  const { t } = useTranslation('signup')
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => {
          onSubmit('user')
        }}
      >
        {t('asAUser')}
      </Button>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => {
          onSubmit('organization')
        }}
      >
        {t('asAOrganization')}
      </Button>
    </Box>
  )
}

SignupRoleSelector.propTypes = {
  onSubmit: PropTypes.func
}

SignupRoleSelector.defaultProps = {}

export default SignupRoleSelector

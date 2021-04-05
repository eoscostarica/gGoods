import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import { useTranslation } from 'react-i18next'

import { eosConfig } from '../../config'

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxHeight: 400
  },
  boxInfo: {
    width: '100%',
    marginBottom: theme.spacing(1)
  },
  rowBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: 40,
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    '& p': {
      color: theme.palette.secondary.onSecondaryMediumEmphasizedText
    }
  },
  divider: {
    width: '100%'
  }
}))

const SignupAccount = ({ account }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Box className={classes.boxInfo}>
      <Box className={classes.rowBox}>
        <Typography variant="h6">{t('account')}</Typography>
        <Typography variant="body1">
          <Link
            href={`${eosConfig.BLOCK_EXPLORER_URL}account/${account}`}
            target="_blank"
            rel="noopener"
            color="secondary"
          >
            {account}
          </Link>
        </Typography>
      </Box>
      <Divider className={classes.divider} />
    </Box>
  )
}

SignupAccount.propTypes = {
  account: PropTypes.string
}

SignupAccount.defaultProps = {}

export default SignupAccount

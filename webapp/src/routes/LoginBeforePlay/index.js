import React, { memo } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import { useSharedState } from '../../context/state.context'

const LoginBeforePlay = () => {
  const { t } = useTranslation('loginBeforePlayRoute')
  const history = useHistory()
  const [, { login }] = useSharedState()

  return (
    <Box p={2}>
      <Typography>{t('message')}</Typography>
      <Box p={2} display="flex" justifyContent="space-evenly">
        <Button variant="text" color="primary" onClick={login}>
          <KeyboardArrowRightIcon />
          {t('register')}
        </Button>
        <Button
          variant="text"
          color="primary"
          onClick={() => history.push('/goods')}
        >
          <KeyboardArrowRightIcon />
          {t('marketplace')}
        </Button>
      </Box>
    </Box>
  )
}

LoginBeforePlay.propTypes = {}

export default memo(LoginBeforePlay)

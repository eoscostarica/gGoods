import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Organizations = () => {
  const { t } = useTranslation('homeRoute')

  return (
    <Box>
      <Typography>{t('welcomeMessage')}</Typography>
    </Box>
  )
}

Organizations.propTypes = {}

export default Organizations

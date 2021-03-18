import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import AvatarMaker from '../../components/AvatarMaker'

const Home = () => {
  const { t } = useTranslation('homeRoute')

  return (
    <Box>
      <Typography>{t('welcomeMessage')}</Typography>
      <AvatarMaker />
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import AvatarMaker from '../../components/AvatarMaker'
import Carousel from '../../components/Carousel'
import Signup from '../../components/Signup/Signup'

const Home = () => {
  const { t } = useTranslation('homeRoute')
 
  return (
    <Box>
      <Signup isHome />
      <Typography>{t('welcomeMessage')}</Typography>
      <AvatarMaker />
      <Carousel items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} />
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

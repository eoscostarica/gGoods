import React, { memo } from 'react'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Slider from '@ant-design/react-slick'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/styles'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import {
  GET_FEATURED_ORGANIZATIONS,
  GET_FEATURED_GGOODS_ON_SALE
} from '../../gql'
import { useSharedState } from '../../context/state.context'
import { CardImage, CardInfo, CardAvatar } from '../../components/Card'
import Gift from '../../images/assets/gift.png'
import Organization from '../../images/assets/organization.png'
import Help from '../../images/assets/help.png'
import Bg from '../../images/assets/cardBg.jpg'
import Bg1 from '../../images/assets/cardBg1.png'
import Bg2 from '../../images/assets/cardBg2.jpg'
import { getGames } from '../../utils'

import styles from './styles'

const useStyles = makeStyles(styles)
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true
}

const Home = () => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('homeRoute')
  const { data: organizations } = useQuery(GET_FEATURED_ORGANIZATIONS, {})
  const { data: ggoods } = useQuery(GET_FEATURED_GGOODS_ON_SALE, {})
  const [state, { login }] = useSharedState()

  const handleOnClickJoinNow = () => {
    if (state.user) {
      history.push('/about')
      return
    }

    login()
  }

  const handleNavigate = url => () => {
    history.push(url)
  }

  return (
    <Box className={classes.root}>
      <Slider {...settings}>
        <div>
          <CardImage
            primaryText={t('card1Title')}
            secondaryText={t('card1Description')}
            img={Bg1}
          />
        </div>
        <div>
          <CardImage
            primaryText={t('card2Title')}
            secondaryText={t('card2Description')}
            img={Bg}
          />
        </div>
        <div>
          <CardImage
            primaryText={t('card3Title')}
            secondaryText={t('card3Description')}
            img={Bg2}
          />
        </div>
      </Slider>
      <Box className={clsx(classes.rowsBox, classes.firstTitle)}>
        <Typography variant="h5">{t('title')}</Typography>
        <Box className={classes.displayInline}>
          <Box
            className={classes.optionsWrapper}
            onClick={handleOnClickJoinNow}
          >
            <ArrowForwardIosIcon />
            <Typography>{t('joinNow')}</Typography>
          </Box>
          <Box
            className={classes.optionsWrapper}
            onClick={handleNavigate('/goods')}
          >
            <ArrowForwardIosIcon />
            <Typography>{t('browseGGoodsOnSale')}</Typography>
          </Box>
          <Box
            className={classes.optionsWrapper}
            onClick={handleNavigate('/organizations')}
          >
            <ArrowForwardIosIcon />
            <Typography>{t('findACauseToHelp')}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.rowsBox}>
        <Typography variant="h5">{t('howDoesItWork')}</Typography>
        <Box className={classes.displayInline}>
          <Box className={classes.orgWrapper}>
            <img alt="help" src={Help} />
            <Typography>{t('buyNFTToHelp')}</Typography>
          </Box>
          <Box className={classes.orgWrapper}>
            <img alt="organization" src={Organization} />
            <Typography>{t('collectAndUseNFT')}</Typography>
          </Box>
          <Box className={classes.orgWrapper}>
            <img alt="gift" src={Gift} />
            <Typography>{t('helpYourNGO')}</Typography>
          </Box>
        </Box>
      </Box>
      {!!organizations?.items?.length && (
        <Box className={classes.rowsBox}>
          <Typography variant="h5">{t('featuredOrganizations')}</Typography>
          <Box className={clsx(classes.cardsWrapper, classes.infoCardsWrapper)}>
            {organizations?.items?.map(organization => (
              <CardInfo
                key={organization.id}
                primaryText={organization.name}
                secondaryText={organization.orgInfo?.category}
                img={organization.orgInfo?.image}
                onClick={handleNavigate(`organization/${organization.id}`)}
              />
            ))}
          </Box>
          <Box className={classes.browseGoods}>
            <Button size="small" onClick={handleNavigate('/organizations')}>
              {t('browseMoreOrganizations')}
            </Button>
          </Box>
        </Box>
      )}
      {!!ggoods?.items?.length && (
        <Box className={classes.rowsBox}>
          <Typography variant="h5">{t('featuredGGoods')}</Typography>
          <Box
            className={clsx(classes.cardsWrapper, classes.ggoodCardsWrapper)}
          >
            {ggoods?.items?.map(ggood => (
              <CardAvatar
                key={ggood.id}
                name={ggood.metadata.name}
                image={ggood.metadata.imageSmall}
                backgroundColor={ggood.metadata.backgroundColor}
                onClick={handleNavigate(`/good/${ggood.id}`)}
              />
            ))}
          </Box>
          <Box className={classes.browseGoods}>
            <Button size="small" onClick={handleNavigate('/goods')}>
              {t('browseMoreGGoods')}
            </Button>
          </Box>
        </Box>
      )}
      <Box className={classes.rowsBox}>
        <Typography variant="h5">{t('featuredGames')}</Typography>
        <Box className={clsx(classes.cardsWrapper, classes.infoCardsWrapper)}>
          {getGames(true).map((game, index) => (
            <CardInfo
              key={index}
              primaryText={game.name}
              secondaryText={`${t('by')} ${game.by}`}
              img={game.img}
              onClick={handleNavigate(game.pathname)}
            />
          ))}
        </Box>
        <Box className={classes.browseGoods}>
          <Button size="small" onClick={handleNavigate('/games')}>
            {t('browseMoreGames')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

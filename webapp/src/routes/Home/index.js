import React, { memo } from 'react'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
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

import styles from './styles'

const useStyles = makeStyles(styles)
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
}

const Home = () => {
  const classes = useStyles()
  const history = useHistory()
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
    <Box>
      <Slider {...settings}>
        <div>
          <CardImage
            primaryText="Play your heart out"
            secondaryText="Play games that integrate your NFTs"
            img={Bg}
          />
        </div>
        <div>
          <CardImage
            primaryText="NFTs for good!"
            secondaryText="Digital goods designed to help good causes"
            img={Bg1}
          />
        </div>
        <div>
          <CardImage
            primaryText="App ready NFTs"
            secondaryText="Create for your cause and engage with your goods"
            img={Bg2}
          />
        </div>
      </Slider>
      <Box className={clsx(classes.rowsBox, classes.firstTitle)}>
        <Typography variant="h5">Get Started with gGoods</Typography>
        <Box className={classes.displayInline}>
          <Box
            className={classes.optionsWrapper}
            onClick={handleOnClickJoinNow}
          >
            <ArrowForwardIosIcon />
            <Typography>Join now!</Typography>
          </Box>
          <Box
            className={classes.optionsWrapper}
            onClick={handleNavigate('/goods')}
          >
            <ArrowForwardIosIcon />
            <Typography>Browse Goods for sale</Typography>
          </Box>
          <Box
            className={classes.optionsWrapper}
            onClick={handleNavigate('/organizations')}
          >
            <ArrowForwardIosIcon />
            <Typography>Find a cause to help</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.rowsBox}>
        <Typography variant="h5">How does it work?</Typography>
        <Box className={classes.displayInline}>
          <Box className={classes.orgWrapper}>
            <img alt="help" src={Help} />
            <Typography>Buy NFTs to support your favorite causes</Typography>
          </Box>
          <Box className={classes.orgWrapper}>
            <img alt="organization" src={Organization} />
            <Typography>Collect and use gGoods as in-app items</Typography>
          </Box>
          <Box className={classes.orgWrapper}>
            <img alt="gift" src={Gift} />
            <Typography>Help your NGO or community fundraise</Typography>
          </Box>
        </Box>
      </Box>
      {!!organizations?.items?.length && (
        <Box className={classes.rowsBox}>
          <Typography variant="h5">Featured Organizations</Typography>
          <Box className={classes.cardInfoWrapper}>
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
        </Box>
      )}
      {!!ggoods?.items?.length && (
        <>
          <Box className={classes.rowsBox}>
            <Typography variant="h5">Featured Goods</Typography>
          </Box>
          <Box className={classes.rowsBoxWrap}>
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
              Browse goods
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

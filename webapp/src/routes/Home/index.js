import React, { memo } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Slider from '@ant-design/react-slick'
import Grid from '@material-ui/core/Grid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/styles'
import Signup from '../../components/Signup/Signup'
import CredentialsRecovery from '../../components/CredentialsRecovery'

import { CardImage, CardInfo, CardAvatar } from '../../components/Card'
import Gift from '../../images/assets/gift.png'
import Organization from '../../images/assets/organization.png'
import Help from '../../images/assets/help.png'
import Bg from '../../images/assets/cardBg.png'
import Bg1 from '../../images/assets/cardBg1.png'
import Bg2 from '../../images/assets/cardBg2.png'
import bgCanvas from '../../images/templates/bgs/1.png'

import styles from './styles'

const useStyles = makeStyles(styles)

const GOOD_LIST = [
  {
    name: 'Name'
  },
  {
    name: 'Name'
  },
  {
    name: 'Name'
  },
  {
    name: 'Name'
  },
  {
    name: 'Name'
  },
  {
    name: 'Name'
  },
  {
    name: 'Name'
  }
]

const Home = () => {
  const classes = useStyles()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  return (
    <Box>
      <Signup isHome />
      <CredentialsRecovery />
      <Slider {...settings}>
        <div>
          <CardImage
            primaryText="Fun with your goods"
            secondaryText="Games are now able to use your NFTs"
            img={Bg}
          />
        </div>
        <div>
          <CardImage
            primaryText="Digital goods for good!"
            secondaryText="NFTs designed to help good causes"
            img={Bg1}
          />
        </div>
        <div>
          <CardImage
            primaryText="Help local shelters"
            secondaryText="or animal rescues around the world"
            img={Bg2}
          />
        </div>
      </Slider>
      <Box className={classes.rowsBox}>
        <Typography variant="h5">What can I do?</Typography>
        <Box className={classes.displayInline}>
          <Box className={classes.optionsWrapper}>
            <ArrowForwardIosIcon />
            <Typography variant="p">Join now!</Typography>
          </Box>
          <Box className={classes.optionsWrapper}>
            <ArrowForwardIosIcon />
            <Typography variant="p">Browse for Goods</Typography>
          </Box>
          <Box className={classes.optionsWrapper}>
            <ArrowForwardIosIcon />
            <Typography variant="p">Find a cause to help</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.rowsBox}>
        <Typography variant="h5">But how does it work?</Typography>
        <Box className={classes.displayInline}>
          <Box className={classes.orgWrapper}>
            <img alt="help" src={Help} />
            <Typography variant="p">
              You can help by buying goods created by your choice of cause
            </Typography>
          </Box>
          <Box className={classes.orgWrapper}>
            <img alt="gift" src={Gift} />
            <Typography variant="p">
              Natural rescue organizations create NFT Goods for free.
            </Typography>
          </Box>
          <Box className={classes.orgWrapper}>
            <img alt="organization" src={Organization} />
            <Typography variant="p">
              Organizations can continue to operate and help preserve nature.{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.rowsBox}>
        <Typography variant="h5">Featured Organizations</Typography>
        <Box className={classes.cardInfoWrapper}>
          <CardInfo
            primaryText="Local Shelter"
            secondaryText="Cats and Dogs"
            img={bgCanvas}
          />
          <CardInfo
            primaryText="Animal Reserve"
            secondaryText="Tropicl Forest "
            img={bgCanvas}
          />
          <CardInfo
            primaryText="Sea Protectors"
            secondaryText="Marine Life"
            img={bgCanvas}
          />
        </Box>
      </Box>
      <Box className={classes.rowsBoxWrap}>
        <Grid container spacing={2}>
          {GOOD_LIST.map(game => (
            <Grid item xs={6} md={4} lg={1} key={game.name}>
              <CardAvatar />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className={classes.browseGoods}>
        <Button size="small">Browse goods</Button>
      </Box>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

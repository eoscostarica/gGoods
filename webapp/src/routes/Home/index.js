import React, { memo } from 'react'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Slider from '@ant-design/react-slick'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/styles'

import { CardImage, CardInfo, CardAvatar } from '../../components/Card'
import Gift from '../../images/assets/gift.png'
import Organization from '../../images/assets/organization.png'
import Help from '../../images/assets/help.png'
import Bg from '../../images/assets/cardBg.jpg'
import Bg1 from '../../images/assets/cardBg1.png'
import Bg2 from '../../images/assets/cardBg2.jpg'
import dogShelter from '../../images/assets/dogShelter.svg'
import animalRescue from '../../images/assets/animalRescue.svg'
import oceanProtector from '../../images/assets/oceanProtector.svg'

import styles from './styles'

const useStyles = makeStyles(styles)

const GOOD_LIST = [
  {
    name: 'Name',
    backgroundColor: '#FA9F37',
    image: 'QmQESvFD9efd9gML4vFagFV5ryZdg8ivEMpSdMU7gKTsNn'
  },
  {
    name: 'Name',
    backgroundColor: '#FA9F37',
    image: 'QmQESvFD9efd9gML4vFagFV5ryZdg8ivEMpSdMU7gKTsNn'
  },
  {
    name: 'Name',
    backgroundColor: '#FA9F37',
    image: 'QmQESvFD9efd9gML4vFagFV5ryZdg8ivEMpSdMU7gKTsNn'
  },
  {
    name: 'Name',
    backgroundColor: '#FA9F37',
    image: 'QmQESvFD9efd9gML4vFagFV5ryZdg8ivEMpSdMU7gKTsNn'
  },
  {
    name: 'Name',
    backgroundColor: '#FA9F37',
    image: 'QmQESvFD9efd9gML4vFagFV5ryZdg8ivEMpSdMU7gKTsNn'
  },
  {
    name: 'Name',
    backgroundColor: '#FA9F37',
    image: 'QmQESvFD9efd9gML4vFagFV5ryZdg8ivEMpSdMU7gKTsNn'
  },
  {
    name: 'Name',
    backgroundColor: '#FA9F37',
    image: 'QmQESvFD9efd9gML4vFagFV5ryZdg8ivEMpSdMU7gKTsNn'
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
          <Box className={classes.optionsWrapper}>
            <ArrowForwardIosIcon />
            <Typography>Join now!</Typography>
          </Box>
          <Box className={classes.optionsWrapper}>
            <ArrowForwardIosIcon />
            <Typography>Browse Goods for sale</Typography>
          </Box>
          <Box className={classes.optionsWrapper}>
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
      <Box className={classes.rowsBox}>
        <Typography variant="h5">Featured Organizations</Typography>
        <Box className={classes.cardInfoWrapper}>
          <CardInfo
            primaryText="Ocean Protectors"
            secondaryText="Sea Wildlife"
            img={oceanProtector}
          />
          <CardInfo
            primaryText="Animal Reserve"
            secondaryText="Tropicl Forest "
            img={animalRescue}
          />
          <CardInfo
            primaryText="Dog Shelter"
            secondaryText="Pet Rescue"
            img={dogShelter}
          />
        </Box>
      </Box>
      <Box className={classes.rowsBox}>
        <Typography variant="h5">Featured Goods</Typography>
      </Box>
      <Box className={classes.rowsBoxWrap}>
        {GOOD_LIST.map((ggood, index) => (
          <CardAvatar
            key={`${index}-${ggood.backgroundColor}`}
            name={ggood.name}
            image={ggood.image}
            backgroundColor={ggood.backgroundColor}
          />
        ))}
      </Box>
      <Box className={classes.browseGoods}>
        <Button size="small">Browse goods for sale</Button>
      </Box>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)

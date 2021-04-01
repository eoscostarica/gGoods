import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Chip from '@material-ui/core/Chip'
import Hidden from '@material-ui/core/Hidden'

import { CardAvatar } from '../../components/Card'
import DonateNow from '../../components/DonateNow'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const GOOD = {
  name: 'Marviva',
  owner: 'Sealife protection',
  bio:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae justo eros. Nullam vitae massa vitae ipsum viverra scelerisque vel eu mi. Nullam sodales eros ut erat fringilla laoreet. Duis hendrerit tortor at ex sagittis ullamcorper. Cras leo odio, mattis vitae ultricites id, dapibus sed augue.',
  impact:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae justo eros. Nullam vitae massa vitae ipsum viverra scelerisque vel eu mi. Nullam sodales eros ut erat fringilla laoreet. Duis hendrerit tortor at ex sagittis ullamcorper. Cras leo odio, mattis vitae ultricites id, dapibus sed augue.',
  sugestPriceEOS: '5',
  sugestPriceUSD: '5'
}

const relatedGoods = [
  {
    name: 'Name',
    image: '/static/media/avatar.8d7f2dc7.png'
  },
  {
    name: 'Name',
    image: '/static/media/avatar.8d7f2dc7.png'
  },
  {
    name: 'Name',
    image: '/static/media/avatar.8d7f2dc7.png'
  },
  {
    name: 'Name',
    image: '/static/media/avatar.8d7f2dc7.png'
  },
  {
    name: 'Name',
    image: '/static/media/avatar.8d7f2dc7.png'
  },
  {
    name: 'Name',
    image: '/static/media/avatar.8d7f2dc7.png'
  },
  {
    name: 'Name',
    image: '/static/media/avatar.8d7f2dc7.png'
  }
]

const GoodPage = () => {
  const classes = useStyles()
  const [openPayModal, setOpenPayModal] = useState(false)
  // @todo: load ggood info from api when it's not in the state
  const [{ ggoodOnSaleSelected }] = useSharedState()

  const handlerSetOpenPayModal = () => {
    setOpenPayModal(!openPayModal)
  }

  const buyNFT = () => {
    setOpenPayModal(true)
  }

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.sectionBox}>
        <Grid container spacing={4}>
          <Hidden smDown>
            <Grid item xs={12} md={8}>
              <Box className={classes.titleBox}>
                <Typography noWrap variant="h3">
                  {GOOD.name}
                </Typography>
                <Typography noWrap variant="h6">
                  {GOOD.owner}
                </Typography>
              </Box>
              <Box className={classes.sectionBox}>
                <Typography noWrap gutterBottom variant="h6">
                  Bio
                </Typography>
                <Typography variant="body1">{GOOD.bio}</Typography>
              </Box>
              <Box className={classes.sectionBox}>
                <Typography noWrap gutterBottom variant="h6">
                  Impact
                </Typography>
                <Typography variant="body1">{GOOD.impact}</Typography>
              </Box>
              <Typography variant="h6" align="center">
                We’re Grateful for any help you can provide!
              </Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={4}>
            <Card>
              <CardAvatar
                id={ggoodOnSaleSelected?.id}
                name={ggoodOnSaleSelected?.name}
                image={ggoodOnSaleSelected?.image}
                backgroundColor={ggoodOnSaleSelected?.backgroundColor}
              />
            </Card>
            <Box className={classes.priceBox}>
              <Typography variant="overline" style={{ fontWeight: 'bold' }}>
                Suggested Price
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Box>
                    <Chip
                      label={ggoodOnSaleSelected?.amount}
                      color="primary"
                      className={classes.chip}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className={classes.boxFlexEnd}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.buyButtonDesktop}
                      onClick={buyNFT}
                    >
                      Buy now
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12} md={8}>
              <Box className={classes.titleBox}>
                <Typography noWrap variant="h3">
                  {GOOD.name}
                </Typography>
                <Typography noWrap variant="h6">
                  {GOOD.owner}
                </Typography>
              </Box>
              <Box className={classes.sectionBox}>
                <Typography noWrap gutterBottom variant="h6">
                  Bio
                </Typography>
                <Typography variant="body1">{GOOD.bio}</Typography>
              </Box>
              <Box className={classes.sectionBox}>
                <Typography noWrap gutterBottom variant="h6">
                  Impact
                </Typography>
                <Typography variant="body1">{GOOD.impact}</Typography>
              </Box>
              <Typography variant="h6" align="center">
                We’re Grateful for any help you can provide!
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
      <Box className={classes.sectionBox}>
        <Typography noWrap gutterBottom variant="h6">
          Related Goods
        </Typography>
        <Box>
          <Grid container spacing={2}>
            {relatedGoods.map((good, index) => (
              <Grid item xs={6} md={3} lg={1} key={index}>
                <CardAvatar name={good.name} image={good.image} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <DonateNow open={openPayModal} handlerOpen={handlerSetOpenPayModal} />
    </Box>
  )
}

export default GoodPage

import React, { useState, createRef, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import { useQuery } from '@apollo/client'
import { Rnd } from 'react-rnd'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Camera from 'react-html5-camera-photo'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import ShareIcon from '@material-ui/icons/Share'
import Fade from '@material-ui/core/Fade'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import 'react-html5-camera-photo/build/css/index.css'

import { mainConfig } from '../../config'
import { CardAvatar, CardAvatarSkeleton } from '../../components/Card'
import { MY_GGOODS } from '../../gql'
import { getUniqueGGoodsByName } from '../../utils'

import styles from './styles'

const useStyles = makeStyles(styles)

const AvartarNFT = ({ img }) => (
  <Box
    style={{
      margin: 0,
      height: '100%',
      paddingBottom: '40px',
      backgroundImage: `url("${mainConfig.ipfsUrl}/ipfs/${img}")`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }}
  />
)

AvartarNFT.propTypes = {
  img: PropTypes.string
}

const SelfieCam = () => {
  const classes = useStyles()
  const ref = createRef(null)
  const canvas = useRef()
  const nftImg = useRef()
  const { t } = useTranslation('selfieCam')
  const [selfie, setSelfie] = useState()
  const [open, setOpen] = useState(false)
  const [ggoodsSelected, setGgoodsSelected] = useState()
  const { loading, data } = useQuery(MY_GGOODS)
  const [nftSetting, setNftSetting] = useState({
    width: 100,
    height: 100,
    x: 50,
    y: 50
  })

  const downloadURI = nftValues => {
    const ctx = canvas.current.getContext('2d')
    const background = new Image()

    background.src = selfie
    background.crossOrigin = 'anonymous'

    const nft = nftImg.current

    nft.crossOrigin = 'anonymous'

    background.onload = () => {
      ctx.drawImage(background, 0, 0)
      ctx.drawImage(
        nft,
        nftValues.x,
        nftValues.y,
        nftValues.width,
        nftValues.height
      )
    }
  }

  const downloadScreenshot = () => {
    downloadURI(nftSetting)

    const link = document.createElement('a')

    link.download = 'selfie-cam'
    link.href = canvas.current.toDataURL()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCancel = () => {
    setSelfie(null)
  }

  const handleOpen = item => {
    setGgoodsSelected(item.image)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTakePhoto = dataUri => {
    setSelfie(dataUri)
  }

  const handleOnDragStop = (e, d) => {
    downloadURI({ ...nftSetting, x: d.x, y: d.y })
    setNftSetting({ ...nftSetting, x: d.x, y: d.y })
  }

  const handleOnResizeStop = (e, direction, ref, delta, position) => {
    const width = ref.style.width.split('px')
    const height = ref.style.height.split('px')
    const values = {
      ...nftSetting,
      width: parseInt(width[0]),
      height: parseInt(height[0])
    }

    downloadURI(values)
    setNftSetting(values)
  }

  return (
    <Box className={classes.selfieBox}>
      <Typography variant="h4" className={classes.titlePage}>
        {t('title')}
      </Typography>
      <Typography className={classes.textPageDescription}>
        {t('paragraph1')}
      </Typography>
      <Typography variant="h5" className={classes.titlePage}>
        {t('subTitle')}
      </Typography>

      <Box>
        {loading && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3} lg={2}>
                <CardAvatarSkeleton />
              </Grid>
              <Grid item xs={6} md={3} lg={2}>
                <CardAvatarSkeleton />
              </Grid>
              <Grid item xs={6} md={3} lg={2}>
                <CardAvatarSkeleton />
              </Grid>
            </Grid>
          </Box>
        )}

        <Grid container spacing={2}>
          {getUniqueGGoodsByName(data?.ggoods || []).map((item, index) => (
            <Grid item xs={6} md={3} lg={2} key={index}>
              <CardAvatar
                id={item.id}
                name={item.metadata.name}
                image={item.metadata.imageSmall}
                backgroundColor={item.metadata.backgroundColor}
                onClick={handleOpen}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {!selfie && (
              <Camera
                onTakePhoto={dataUri => {
                  handleTakePhoto(dataUri)
                }}
                idealResolution={{ width: 640, height: 480 }}
              />
            )}
            {selfie && (
              <>
                <img
                  src={
                    ggoodsSelected &&
                    `${mainConfig.ipfsUrl}/ipfs/${ggoodsSelected}`
                  }
                  className={classes.displayNone}
                  ref={nftImg}
                />
                <canvas
                  ref={canvas}
                  width={640}
                  height={480}
                  className={classes.displayNone}
                />
                <Box
                  ref={ref}
                  className={classes.picture}
                  style={{
                    backgroundImage: `url("${selfie}")`
                  }}
                >
                  <Rnd
                    default={{
                      x: 10,
                      y: 20,
                      width: 100,
                      height: 100
                    }}
                    minWidth={100}
                    minHeight={100}
                    bounds="window"
                    onDragStop={handleOnDragStop}
                    onResizeStop={handleOnResizeStop}
                  >
                    <AvartarNFT img={ggoodsSelected} />
                  </Rnd>
                  <Grid container className={classes.selfieOptionBtn}>
                    <Grid item xs={12} sm={4}>
                      <Box p={2} className={classes.boxButton}>
                        <ShareIcon />
                        <Typography>{t('share')}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box
                        p={2}
                        className={classes.boxButton}
                        onClick={downloadScreenshot}
                      >
                        <GetAppIcon />
                        <Typography>{t('save')}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.cancelBtn}>
                      <Box
                        p={2}
                        className={classes.boxButton}
                        onClick={handleCancel}
                      >
                        <DeleteIcon />
                        <Typography>{t('cancel')}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </Box>
  )
}

SelfieCam.propTypes = {}

export default SelfieCam

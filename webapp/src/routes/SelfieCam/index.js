import React, { useState, createRef } from 'react'
import { useScreenshot, createFileName } from 'use-react-screenshot'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import { Rnd } from 'react-rnd'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Camera from 'react-html5-camera-photo'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import 'react-html5-camera-photo/build/css/index.css'

import { CardAvatar } from '../../components/Card'
import { baselist } from '../../images/templates/templatelist'
import styles from './styles'

const GOODS_LIST = [
  {
    name: 'Lola the Jaguar'
  },
  {
    name: 'Jenny Koala'
  },
  {
    name: 'Test the Test'
  }
]

const useStyles = makeStyles(styles)

const AvartarNFT = () => (
  <Box
    style={{
      margin: 0,
      height: '100%',
      paddingBottom: '40px',
      backgroundImage: `url("${baselist[0]}")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
  />
)

AvartarNFT.propTypes = {}

const SelfieCam = () => {
  const classes = useStyles()
  const ref = createRef(null)
  const { t } = useTranslation('selfieCam')
  const [selfie, setSelfie] = useState()
  const [open, setOpen] = useState(false)
  /* eslint-disable no-unused-vars */
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  })
  /* eslint-enable no-unused-vars */

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTakePhoto = dataUri => {
    setSelfie(dataUri)
  }

  const download = (image, { name = 'img', extension = 'jpg' } = {}) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download)

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
        <Grid container spacing={2}>
          {GOODS_LIST.map(game => (
            <Grid item xs={6} md={3} lg={2} key={game.name}>
              <CardAvatar
                name={game.name}
                useLink={false}
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
              />
            )}
            {selfie && (
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
                    width: 200,
                    height: 200
                  }}
                  minWidth={200}
                  minHeight={200}
                  bounds="window"
                >
                  <AvartarNFT />
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
                    <Box p={2} className={classes.boxButton}>
                      <DeleteIcon />
                      <Typography>{t('cancel')}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </div>
        </Fade>
      </Modal>
    </Box>
  )
}

SelfieCam.propTypes = {}

export default SelfieCam

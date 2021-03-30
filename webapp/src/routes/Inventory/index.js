import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { CardAvatar } from '../../components/Card'
import PublishGood from '../../components/PublishGood'
import PublishGoodInfo from '../../components/PublishGoodInfo'

import styles from './styles'

const useStyles = makeStyles(styles)

const templatesList = [
  {
    name: 'Lola the Jaguar'
  }
]

const goodsList = [
  {
    name: 'Lola the Jaguar',
    donation: '10',
    units: 10
  },
  {
    name: 'Lola the Jaguar',
    donation: '10'
  }
]

const Inventory = () => {
  const classes = useStyles()
  const { t } = useTranslation('inventoryRoute')
  const [openModalPublish, setOpenModalPublish] = useState(false)
  const [openModalPublishInfo, setOpenModalPublishInfo] = useState(false)

  const handlerPublish = () => {
    console.log('hola mundo')
    setOpenModalPublish(true)
  }

  const handlerViewPublish = () => {
    console.log('hola mundo')
    setOpenModalPublishInfo(true)
  }

  const handlerCloseModalPublish = () => {
    setOpenModalPublish(false)
  }

  const handlerCloseModalPublishInfo = () => {
    setOpenModalPublishInfo(false)
  }

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.headerBox}>
        <Typography variant="h4" gutterBottom>
          {t('title')}
        </Typography>
        <Typography variant="body1">{t('paragraph1')}</Typography>
      </Box>
      <Box className={classes.sectionBox}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.MainButton}
            >
              {t('uploadButton')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.MainButton}
            >
              {t('createButton')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {templatesList.length === 0 && goodsList.length === 0 && (
        <Box className={classes.sectionBox}>
          <Typography
            variant="overline"
            align="center"
            className={classes.overlineTag}
          >
            {t('emptyTemplate')}
          </Typography>
        </Box>
      )}
      {templatesList.length > 0 && (
        <Box className={classes.sectionBox}>
          <Box className={classes.sectionBox}>
            <Typography variant="h6" gutterBottom>
              {t('templatesTitle')} ({templatesList.length})
            </Typography>
            <Typography variant="body1">{t('templatesParagraph')}</Typography>
          </Box>
          <Grid container spacing={2}>
            {templatesList.map(template => (
              <Grid item xs={6} md={3} lg={2} key={template.name}>
                <CardAvatar
                  name={template.name}
                  publish
                  handlerPublish={handlerPublish}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {goodsList.length > 0 && (
        <Box className={classes.sectionBox}>
          <Box className={classes.sectionBox}>
            <Typography variant="h6" gutterBottom>
              {t('goodsTitle')} ({goodsList.length})
            </Typography>
            <Typography variant="body1">{t('goodsParagraph')}</Typography>
          </Box>
          <Grid container spacing={2}>
            {goodsList.map(goods => (
              <Grid item xs={6} md={3} lg={2} key={goods.name}>
                <CardAvatar
                  name={goods.name}
                  donation={goods.donation}
                  units={goods.units}
                  viewPusblish
                  handlerViewPublish={handlerViewPublish}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <PublishGood
        open={openModalPublish}
        handlerOpen={handlerCloseModalPublish}
      />
      <PublishGoodInfo
        open={openModalPublishInfo}
        handlerOpen={handlerCloseModalPublishInfo}
      />
    </Box>
  )
}

Inventory.propTypes = {}

export default Inventory

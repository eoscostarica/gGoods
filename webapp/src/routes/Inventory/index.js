import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useQuery } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useHistory } from 'react-router-dom'

import { CardAvatar } from '../../components/Card'
import PublishGood from '../../components/PublishGood'
import PublishGoodInfo from '../../components/PublishGoodInfo'
import { useSharedState } from '../../context/state.context'
import { GGOODS_ON_SALE, TEMPLATES_QUERY } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const Inventory = () => {
  const classes = useStyles()
  const { t } = useTranslation('inventoryRoute')
  const history = useHistory()
  const [ggoodsList, setGGoodsList] = useState()
  const [templatesList, setTemplatesList] = useState()
  const [selectedTemplate, setSelectedTemplate] = useState()
  const [selectedGGood, setSelectedGGood] = useState()
  const [{ user }] = useSharedState()
  const { loading: loadingGGoods, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: user?.account }
  })
  const { loading: loadingTemplates, data: templates } = useQuery(
    TEMPLATES_QUERY
  )

  const handleOnClickGGood = ggood => () => {
    setSelectedGGood(ggood)
  }

  const handleOnClickTemplate = template => () => {
    setSelectedTemplate(template)
  }

  useEffect(() => {
    setGGoodsList(
      (ggoods?.items || [])
        ?.filter(item => !!item?.ggoods[0]?.metadata?.imageSmall)
        .map(item => ({
          id: item.id,
          name: `${item?.ggoods[0]?.metadata?.name} v${item?.ggoods[0]?.serial}`,
          image: item?.ggoods[0]?.metadata?.imageSmall,
          backgroundColor: item?.ggoods[0]?.metadata?.backgroundColor,
          amount: item.amount,
          donable: item.donable,
          issuer: item?.ggoods[0]?.issuer,
          description: item?.ggoods[0]?.metadata?.description
        }))
    )
  }, [ggoods])

  useEffect(() => {
    setTemplatesList(
      (templates?.items || []).map(item => ({
        id: item.id,
        name: item?.metadata?.name,
        image: item?.metadata?.imageSmall,
        backgroundColor: item?.metadata?.backgroundColor
      }))
    )
  }, [templates])

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
              onClick={() => history.push('/create-template')}
            >
              {t('uploadButton')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.MainButton}
              onClick={() => history.push('/create-template')}
            >
              {t('createButton')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {loadingTemplates && <CircularProgress />}
      {!loadingTemplates && templatesList?.length === 0 && (
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
      {templatesList?.length > 0 && (
        <Box className={classes.sectionBox}>
          <Box className={classes.sectionBox}>
            <Typography variant="h6" gutterBottom>
              {t('templatesTitle')} ({templatesList.length})
            </Typography>
            <Typography variant="body1">{t('templatesParagraph')}</Typography>
          </Box>
          <Grid container spacing={2}>
            {templatesList.map((item, index) => (
              <Grid item xs={6} md={3} lg={2} key={index}>
                <CardAvatar
                  name={item.name}
                  image={item.image}
                  backgroundColor={item.backgroundColor}
                  onClick={handleOnClickTemplate(item)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {loadingGGoods && <CircularProgress />}
      {!loadingGGoods && ggoodsList?.length === 0 && (
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
      {ggoodsList?.length > 0 && (
        <Box className={classes.sectionBox}>
          <Box className={classes.sectionBox}>
            <Typography variant="h6" gutterBottom>
              {t('goodsTitle')} ({ggoodsList.length})
            </Typography>
            <Typography variant="body1">{t('goodsParagraph')}</Typography>
          </Box>
          <Grid container spacing={2}>
            {ggoodsList.map((item, index) => (
              <Grid item xs={6} md={3} lg={2} key={index}>
                <CardAvatar
                  name={item.name}
                  image={item.image}
                  backgroundColor={item.backgroundColor}
                  donation={item.amount}
                  onClick={handleOnClickGGood(item)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <PublishGood
        open={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        template={selectedTemplate}
      />
      <PublishGoodInfo
        open={!!selectedGGood}
        onClose={() => setSelectedGGood(null)}
        ggood={selectedGGood}
      />
    </Box>
  )
}

Inventory.propTypes = {}

export default Inventory

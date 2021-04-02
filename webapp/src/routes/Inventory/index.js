import React, { useState } from 'react'
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
  const [selectedTemplate, setSelectedTemplate] = useState()
  const [selectedGGood, setSelectedGGood] = useState()
  const [{ user }] = useSharedState()
  const { loading: loadingGGoods, data: ggoods } = useQuery(GGOODS_ON_SALE, {
    variables: { seller: user?.account },
    fetchPolicy: 'network-only'
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
              className={classes.mainButton}
              onClick={() => history.push('/create-template')}
            >
              {t('uploadButton')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.mainButton}
              onClick={() => history.push('/create-template')}
            >
              {t('createButton')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.sectionBox}>
        <Box className={classes.sectionBox}>
          <Typography variant="h6" gutterBottom>
            {t('templatesTitle')} ({templates?.items.length})
          </Typography>
          {loadingTemplates && <CircularProgress />}
          {!loadingTemplates && !!templates?.items?.length && (
            <Typography variant="body1">{t('templatesParagraph')}</Typography>
          )}
          {!loadingTemplates && !templates?.items?.length && (
            <Typography
              variant="overline"
              align="center"
              className={classes.overlineTag}
            >
              {t('emptyTemplates')}
            </Typography>
          )}
        </Box>
        {templates?.items?.length > 0 && (
          <Grid container spacing={2}>
            {templates?.items.map(template => (
              <Grid item xs={6} md={3} lg={2} key={template.id}>
                <CardAvatar
                  name={template.metadata.name}
                  image={template.metadata.imageSmall}
                  backgroundColor={template.metadata.backgroundColor}
                  onClick={handleOnClickTemplate(template)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box className={classes.sectionBox}>
        <Box className={classes.sectionBox}>
          <Typography variant="h6" gutterBottom>
            {t('ggoodsTitle')} ({ggoods?.items.length})
          </Typography>
          {loadingGGoods && <CircularProgress />}
          {!loadingGGoods && !!ggoods?.items?.length && (
            <Typography variant="body1">{t('ggoodsParagraph')}</Typography>
          )}
          {!loadingGGoods && !ggoods?.items?.length && (
            <Typography
              variant="overline"
              align="center"
              className={classes.overlineTag}
            >
              {t('emptyGGoods')}
            </Typography>
          )}
        </Box>
        {ggoods?.items?.length > 0 && (
          <Grid container spacing={2}>
            {ggoods?.items.map(ggood => (
              <Grid item xs={6} md={3} lg={2} key={ggood.id}>
                <CardAvatar
                  name={ggood.metadata.name}
                  image={ggood.metadata.imageSmall}
                  backgroundColor={ggood.metadata.backgroundColor}
                  donation={ggood.amount}
                  onClick={handleOnClickGGood(ggood)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { useMutation } from '@apollo/client'
import { DropzoneArea } from 'material-ui-dropzone'
import { SketchPicker } from 'react-color'

import { CREATE_TEMPLATE_MUTATION } from '../../gql'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const CreateTemplate = () => {
  const classes = useStyles()
  const { t } = useTranslation('createTemplate')
  const [createTemplate, { loading }] = useMutation(CREATE_TEMPLATE_MUTATION)
  const [, { showMessage }] = useSharedState()
  const [tab, setTab] = useState(0)
  const [payload, setPayload] = useState({
    category: '',
    name: '',
    metadata: {
      type: '2dgameAsset',
      name: '',
      description: '',
      imageSmall: '',
      imageLarge: '',
      details: {},
      backgroundColor: '#FFEBC3'
    }
  })

  const handleFileUpload = field => async files => {
    if (!files?.length) {
      return
    }

    const formData = new FormData()
    formData.append('file_name', files[0])
    const response = await fetch('https://ipfsgw.cryptolions.io/upload', {
      method: 'POST',
      body: formData
    })
    const body = await response.json()

    if (!body.status) {
      showMessage({ type: 'error', content: body.data })
      return
    }

    // setPayload(prev => ({ ...prev, [field]: body.data }))
    setPayload(prev => setData(prev, field, body.data))
    showMessage({ content: `uploaded image ${body.data}` })
  }

  const handlePayloadChange = field => event => {
    setPayload(prev => setData(prev, field, event.target.value))
  }

  const setData = (obj, key, value) => {
    if (key.includes('.')) {
      const [a, b] = key.split('.')
      return {
        ...obj,
        [a]: setData(obj[a], b, value)
      }
    }

    return {
      ...obj,
      [key]: value
    }
  }

  const handleSubmit = async () => {
    try {
      const { data } = await createTemplate({
        variables: {
          ...payload
        }
      })
      setPayload({
        category: '',
        name: '',
        metadata: {
          type: '2dgameAsset',
          name: '',
          description: '',
          imageSmall: '',
          imageLarge: '',
          details: {},
          backgroundColor: '#FFEBC3'
        }
      })
      showMessage({ content: `txid: ${data.template.trxid}` })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={true}
            value={payload.metadata.type}
            label={t('type')}
            onChange={handlePayloadChange('metadata.type')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={payload.category}
            label={t('category')}
            onChange={handlePayloadChange('category')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            value={payload.name}
            label={t('name')}
            onChange={event => {
              handlePayloadChange('name')(event)
              handlePayloadChange('metadata.name')(event)
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            multiline={true}
            rows={1}
            rowsMax={5}
            value={payload.metadata.description}
            label={t('description')}
            onChange={handlePayloadChange('metadata.description')}
          />
        </Grid>

        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs
              value={tab}
              onChange={(event, value) => setTab(value)}
              aria-label="simple tabs example"
            >
              <Tab label="Avatar Maker" />
              <Tab label="My Own Design" />
            </Tabs>
          </AppBar>
          {tab === 0 && (
            <Box className={classes.tabPanel}>Insert Avatar Maker Here</Box>
          )}
          {tab === 1 && (
            <Box className={classes.tabPanel}>
              <SketchPicker
                className={classes.colorPicker}
                color={payload.metadata.backgroundColor}
                onChangeComplete={color =>
                  handlePayloadChange('metadata.backgroundColor')({
                    target: { value: color.hex }
                  })
                }
              />

              <DropzoneArea
                filesLimit={1}
                showAlerts={false}
                onChange={handleFileUpload('metadata.imageSmall')}
                acceptedFiles={['image/*']}
                dropzoneText={t('smallImage')}
                classes={{ root: classes.dropzoneArea }}
                previewGridProps={{
                  container: {
                    style: {
                      backgroundColor: payload.metadata.backgroundColor
                    }
                  }
                }}
              />

              <DropzoneArea
                filesLimit={1}
                showAlerts={false}
                onChange={handleFileUpload('metadata.imageLarge')}
                acceptedFiles={['image/*']}
                dropzoneText={t('largeImage')}
                classes={{ root: classes.dropzoneArea }}
                previewGridProps={{
                  container: {
                    style: {
                      backgroundColor: payload.metadata.backgroundColor
                    }
                  }
                }}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      <Box className={classes.actions}>
        {loading && <CircularProgress color="secondary" size={20} />}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t('confirm')}
        </Button>
      </Box>
    </form>
  )
}

export default CreateTemplate

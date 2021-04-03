import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import { useMutation } from '@apollo/client'
import { DropzoneArea } from 'material-ui-dropzone'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { SketchPicker } from 'react-color'
import { useHistory } from 'react-router-dom'

import ComboBox from '../../components/ComboBox'
import { CREATE_TEMPLATE_MUTATION } from '../../gql'
import { ipfs, setData, getLastChars } from '../../utils'
import { useSharedState } from '../../context/state.context'

import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)
const initialValue = {
  category: '',
  name: '',
  metadata: {
    type: '2dgameAsset',
    name: '',
    description: '',
    imageSmall: '',
    imageLarge: '',
    details: {},
    backgroundColor: '#CFCFCF'
  }
}

const CreateCustomTemplate = () => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('createCustomTemplateRoute')
  const [createTemplate, { loading }] = useMutation(CREATE_TEMPLATE_MUTATION)
  const [, { showMessage }] = useSharedState()
  const [payload, setPayload] = useState()

  const handleFileUpload = field => async files => {
    if (!files?.length) {
      return
    }

    const formData = new FormData()
    formData.append('file_name', files[0])

    try {
      const { path } = await ipfs.add({
        content: files[0]
      })

      setPayload(prev => setData(prev, field, path))
      showMessage({ content: t('successUploadImage') })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handlePayloadChange = field => event => {
    setPayload(prev => setData(prev, field, event.target.value))
  }

  const handleSubmit = async () => {
    try {
      const { data } = await createTemplate({
        variables: {
          ...payload
        }
      })
      setPayload(initialValue)
      showMessage({
        type: 'success',
        content: (
          <>
            {t('successMessage')}{' '}
            <a
              href={mainConfig.blockExplorer.replace(
                '{transaction}',
                data.template.trxid
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getLastChars(data.template.trxid)}
            </a>
          </>
        )
      })
      history.push('/inventory')
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  useEffect(() => {
    setPayload(initialValue)
  }, [])

  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">{t('paragraph')}</Typography>
          </Grid>

          <Grid item xs={12}>
            <ComboBox
              fullWidth
              variant="filled"
              value={payload?.category || ''}
              label={t('category')}
              onChange={(event, value) =>
                handlePayloadChange('category')({
                  target: { value }
                })
              }
              options={mainConfig.categories}
            />
          </Grid>

          <Grid item xs={12}>
            <DropzoneArea
              filesLimit={1}
              showAlerts={false}
              onChange={handleFileUpload('metadata.imageSmall')}
              acceptedFiles={['image/*']}
              dropzoneText={t('smallImage')}
              previewGridProps={{
                container: {
                  style: {
                    backgroundColor: payload?.metadata?.backgroundColor
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <DropzoneArea
              filesLimit={1}
              showAlerts={false}
              onChange={handleFileUpload('metadata.imageLarge')}
              acceptedFiles={['image/*']}
              dropzoneText={t('largeImage')}
              previewGridProps={{
                container: {
                  style: {
                    backgroundColor: payload?.metadata?.backgroundColor
                  }
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.colorPickerWrapper}>
              <Typography variant="h5">{t('backgroundColor')}</Typography>
              <SketchPicker
                className={classes.colorPicker}
                color={payload?.metadata?.backgroundColor}
                onChangeComplete={color =>
                  handlePayloadChange('metadata.backgroundColor')({
                    target: { value: color.hex }
                  })
                }
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              value={payload?.name || ''}
              label={t('name')}
              onChange={event => {
                handlePayloadChange('name')(event)
                handlePayloadChange('metadata.name')(event)
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              multiline={true}
              rows={1}
              rowsMax={5}
              value={payload?.metadata?.description || ''}
              label={t('description')}
              onChange={handlePayloadChange('metadata.description')}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !payload?.category || !payload?.name}
          >
            {!loading && t('confirm')}
            {loading && <CircularProgress />}
          </Button>
        </Grid>
      </form>
    </>
  )
}

export default CreateCustomTemplate

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useMutation } from '@apollo/client'
import { DropzoneArea } from 'material-ui-dropzone'
import { SketchPicker } from 'react-color'

import { CREATE_TEMPLATE_MUTATION } from '../../gql'
import { ipfs, setData } from '../../utils'
import { useSharedState } from '../../context/state.context'
import AvatarMaker from '../../components/AvatarMaker'
import Memory from '../../games/Memory'
import { baselist } from '../../images/templates/templatelist'

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
    backgroundColor: '#FFEBC3'
  }
}

const CreateTemplate = () => {
  const classes = useStyles()
  const { t } = useTranslation('createTemplateRoute')
  const [createTemplate, { loading }] = useMutation(CREATE_TEMPLATE_MUTATION)
  const [, { showMessage }] = useSharedState()
  const [tab, setTab] = useState(0)
  const [payload, setPayload] = useState()
  const [canvas, setCanvas] = useState()

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
      showMessage({ content: `${t('successUploadImage')} ${path}` })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handlePayloadChange = field => event => {
    setPayload(prev => setData(prev, field, event.target.value))
  }

  const handleSubmit = async () => {
    const dataUrl = canvas?.toDataURL({ format: 'png' })
    console.log(dataUrl)

    try {
      const { data } = await createTemplate({
        variables: {
          ...payload
        }
      })
      setPayload({ ...initialValue })
      showMessage({ content: `${t('successMessage')} ${data.template.trxid}` })
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
            <TextField
              fullWidth
              disabled={true}
              value={payload?.metadata?.type || ''}
              label={t('type')}
              onChange={handlePayloadChange('metadata.type')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              value={payload?.category || ''}
              label={t('category')}
              onChange={handlePayloadChange('category')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
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
              multiline={true}
              rows={1}
              rowsMax={5}
              value={payload?.metadata?.description || ''}
              label={t('description')}
              onChange={handlePayloadChange('metadata.description')}
            />
          </Grid>

          <Grid item xs={12}>
            <AppBar position="static">
              <Tabs value={tab} onChange={(event, value) => setTab(value)}>
                <Tab label={t('avatarMaker')} />
                <Tab label={t('myOwnDesign')} />
              </Tabs>
            </AppBar>
          </Grid>

          {tab === 0 && (
            <Grid item xs={12}>
              <AvatarMaker onGetDataUrl={setCanvas} />
            </Grid>
          )}

          {tab === 1 && (
            <>
              <Grid item xs={12}>
                <SketchPicker
                  className={classes.colorPicker}
                  color={payload?.metadata?.backgroundColor}
                  onChangeComplete={color =>
                    handlePayloadChange('metadata.backgroundColor')({
                      target: { value: color.hex }
                    })
                  }
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
            </>
          )}

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
      <Memory customOptions={baselist} />
    </>
  )
}

export default CreateTemplate

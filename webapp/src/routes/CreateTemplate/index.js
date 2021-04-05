import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { ipfs, setData, getLastChars, dataURLtoFile } from '../../utils'
import { useSharedState } from '../../context/state.context'
import AvatarMaker from '../../components/AvatarMaker'
import ComboBox from '../../components/ComboBox'
import { CREATE_TEMPLATE_MUTATION } from '../../gql'
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

const CreateTemplate = () => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('createTemplateRoute')
  const [createTemplate, { loading }] = useMutation(CREATE_TEMPLATE_MUTATION)
  const [, { showMessage }] = useSharedState()
  const [payload, setPayload] = useState()
  const [canvas, setCanvas] = useState()

  const handleFileUpload = async () => {
    const dataUrl = canvas?.toDataURL({ format: 'png' })

    if (!dataUrl) {
      return
    }

    try {
      const { path } = await ipfs.add({
        content: dataURLtoFile(dataUrl, 'file.png')
      })

      return path
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handlePayloadChange = field => event => {
    setPayload(prev => setData(prev, field, event.target.value))
  }

  const handleSubmit = async () => {
    const image = await handleFileUpload()

    try {
      const { data } = await createTemplate({
        variables: {
          ...payload,
          metadata: {
            ...payload.metadata,
            imageSmall: image,
            imageLarge: image
          }
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
            <Typography variant="body1">{t('paragraph1')}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">{t('paragraph2')}</Typography>
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
            <AvatarMaker
              onGetDataUrl={setCanvas}
              color={payload?.metadata?.backgroundColor}
              onChangeColor={color =>
                handlePayloadChange('metadata.backgroundColor')({
                  target: { value: color.hex }
                })
              }
            />
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

export default CreateTemplate

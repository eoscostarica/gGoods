import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation } from '@apollo/client'

import { CREATE_TEMPLATE_MUTATION } from '../../gql'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const CreateTemplate = () => {
  const classes = useStyles()
  const { t } = useTranslation('createTemplate')
  const [createTemplate, { loading }] = useMutation(CREATE_TEMPLATE_MUTATION)
  const [, { showMessage }] = useSharedState()
  const [payload, setPayload] = useState({
    category: '',
    name: ''
  })

  const handlePayloadChange = field => event => {
    setPayload(prev => ({ ...prev, [field]: event.target.value }))
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
        name: ''
      })
      showMessage({ content: `txid: ${data.template.trxid}` })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        label={t('category')}
        onChange={handlePayloadChange('category')}
      />
      <TextField label={t('name')} onChange={handlePayloadChange('name')} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {t('confirm')}
      </Button>
      {loading && <CircularProgress color="secondary" size={20} />}
    </form>
  )
}

export default CreateTemplate

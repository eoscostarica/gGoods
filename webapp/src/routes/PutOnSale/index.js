import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import { useMutation, useQuery } from '@apollo/client'

import { PUT_ON_SALE_MUTATION, TEMPLATES_QUERY } from '../../gql'
import { useSharedState } from '../../context/state.context'
import ComboBox from '../../components/ComboBox'

import styles from './styles'
import { mainConfig } from '../../config'

// TODO: filter using account in hasura
const account = 'animalrescue'
const useStyles = makeStyles(styles)
const initialValue = {
  template: '',
  quantity: '',
  amount: '',
  donable: false
}

const PutOnSale = () => {
  const classes = useStyles()
  const { t } = useTranslation('putOnSaleRoute')
  const [putOnSale, { loading }] = useMutation(PUT_ON_SALE_MUTATION)
  const { data } = useQuery(TEMPLATES_QUERY, {
    variables: { account }
  })
  const [, { showMessage }] = useSharedState()
  const [payload, setPayload] = useState()
  const [template, setTemplate] = useState()
  const [templateOptions, setTemplateOptions] = useState()

  const handlePayloadChange = field => event => {
    setPayload(prev => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async () => {
    try {
      const { data: response } = await putOnSale({
        variables: {
          ...payload,
          template: data.templates.find(
            template => template.name === payload.template
          ).id,
          amount: parseFloat(payload.amount),
          quantity: parseInt(payload.quantity)
        }
      })
      setPayload(initialValue)
      showMessage({
        content: `${t('successMessage')} ${response.sale.assets.join(',')}`
      })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  useEffect(() => {
    setPayload(initialValue)
  }, [])

  useEffect(() => {
    setTemplateOptions(data?.templates?.map(template => template.name) || [])
  }, [data])

  useEffect(() => {
    setTemplate(
      data?.templates?.find(template => template.name === payload?.template)
    )
  }, [data, payload?.template])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <ComboBox
            label={t('template')}
            value={payload?.template || ''}
            onChange={(_, value) =>
              handlePayloadChange('template')({ target: { value } })
            }
            options={templateOptions || []}
          />
        </Grid>

        {template && (
          <Grid
            item
            xs={12}
            className={classes.preview}
            style={{ backgroundColor: template.metadata.backgroundColor }}
          >
            <img
              src={`${mainConfig.ipfsUrl}/ipfs/${template.metadata.imageSmall}`}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t('quantity')}
            value={payload?.quantity || ''}
            onChange={handlePayloadChange('quantity')}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t('amount')}
            value={payload?.amount || ''}
            onChange={handlePayloadChange('amount')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            label={t('allowDonation')}
            control={
              <Switch
                checked={payload?.donable || false}
                onChange={(_, value) =>
                  handlePayloadChange('donable')({ target: { value } })
                }
                color="primary"
              />
            }
          />
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            loading ||
            !payload?.template ||
            !payload?.amount ||
            !payload?.quantity
          }
        >
          {!loading && t('confirm')}
          {loading && <CircularProgress color="secondary" size={20} />}
        </Button>
      </Grid>
    </form>
  )
}

export default PutOnSale

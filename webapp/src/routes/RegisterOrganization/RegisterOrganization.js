import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import CustomRouterLink from '../../components/CustomRouterLink'
import {
  UPDATE_STATE_ORGANIZATION,
  CREATE_ACCOUNT_ORGANIZATION_MUTATION
} from '../../gql'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    height: 'calc(100vh - 60px)'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  centerText: {
    textAlign: 'center'
  },
  title: {
    fontSize: '34px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.18',
    letterSpacing: '0.25px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 15
  },
  subTitle: {
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.43',
    letterSpacing: '0.25px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 30
  },
  btnHome: {
    borderRadius: '50px',
    backgroundColor: '#4DD5EA',
    width: '50%',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.14,
    letterSpacing: '1px',
    color: '#ffffff',
    padding: '12px',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}))

const RegisterLifebank = () => {
  const { t } = useTranslation('registerOrganization')
  const classes = useStyles()
  const [lifebank, setLifebank] = useState()
  const { code } = useParams()
  const history = useHistory()

  const [createAccountLifebank, { error: errorCreateAccount }] = useMutation(
    CREATE_ACCOUNT_ORGANIZATION_MUTATION
  )

  const [
    updateEmail,
    {
      loading: loadingVerifyEmail,
      error: errorVerifyEmail,
      data: { update_preregister_organization: organizationData } = {}
    }
  ] = useMutation(UPDATE_STATE_ORGANIZATION)

  const handleCreateAccountLifebank = () => {
    if (lifebank) {
      const { name, email } = lifebank
      const secret = lifebank.password
      createAccountLifebank({
        variables: {
          email,
          emailContent: {
            subject: t('emailMessage.subjectApproveAccount'),
            title: t('emailMessage.titleApproveAccount'),
            message: t('emailMessage.messageApproveAccount')
          },
          name,
          secret,
          verification_code: lifebank.verification_code
        }
      })
    }
  }

  useEffect(() => {
    updateEmail({
      variables: {
        verification_code: code
      }
    })
  }, [code])

  useEffect(() => {
    if (organizationData) {
      setLifebank(organizationData.returning[0])
    }
  }, [organizationData])

  useEffect(() => {
    if (lifebank) handleCreateAccountLifebank()
  }, [lifebank])

  useEffect(() => {
    if (errorVerifyEmail) {
      if (
        errorVerifyEmail.message ===
        'GraphQL error: Could not verify JWT: JWTExpired'
      ) {
        updateEmail({
          variables: {
            verification_code: code
          }
        })
      } else {
        setLifebank(null)
        history.push('/internal-error')
      }
    }
  }, [errorVerifyEmail])

  useEffect(() => {
    if (errorCreateAccount) {
      if (
        errorCreateAccount.message ===
        'GraphQL error: Could not verify JWT: JWTExpired'
      ) {
        updateEmail({
          variables: {
            verification_code: code
          }
        })
      } else {
        setLifebank(null)
        history.push('/internal-error')
      }
    }
  }, [errorCreateAccount])

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} className={classes.content}>
          <Box className={classes.centerText}>
            {loadingVerifyEmail && <CircularProgress />}
            {!loadingVerifyEmail && lifebank && (
              <Typography className={classes.title}>
                {t('accountapprove')}
              </Typography>
            )}
            {!loadingVerifyEmail && !lifebank && (
              <Typography className={classes.title}>
                {t('somethingHappened')}
              </Typography>
            )}
            {!loadingVerifyEmail && (
              <Button
                variant="contained"
                color="secondary"
                component={CustomRouterLink}
                to="/"
                className={classes.btnHome}
              >
                {t('takeHome')}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RegisterLifebank

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import styles from './styles'
import { CardAvatar } from '../Card'

const useStyles = makeStyles(styles)

const PublishGoodInfo = ({ open, ggood, onClose }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const [deleteModal, setDeleteModal] = useState(false)
  const { t } = useTranslation('publishGoodInfo')

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }

  const openDeleteModal = () => {
    setDeleteModal(true)
  }

  const DeleteConfirmation = () => {
    return (
      <Dialog
        open={deleteModal}
        onClose={closeDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Card className={classes.cardRoot}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {t('deleteTitle')}
            </Typography>
            <Typography variant="body2">{t('deleteBody')}</Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button color="primary" className={classes.awnserButton}>
                  {t('yes')}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button color="primary" className={classes.awnserButton}>
                  {t('no')}
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Box className={classes.dialog}>
        <Box className={classes.closeIcon}>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography variant="h6" gutterBottom>
            {t('title')}
          </Typography>
          <Typography variant="body1">{t('paragraph1')}</Typography>
        </Box>
        <Box className={classes.sectionBox}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <CardAvatar
                name={ggood?.metadata?.name}
                image={ggood?.metadata?.imageSmall}
                backgroundColor={ggood?.metadata?.backgroundColor}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBox}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {t('suggestedDonation')}
              </Typography>
              <Box className={classes.sectionBox}>
                <Chip
                  label={ggood?.amount}
                  color="primary"
                  className={classes.chip}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBoxDouble}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {t('availableNow')}
              </Typography>
              <Box className={classes.sectionBox}>
                <Chip label="Basic" color="primary" className={classes.chip} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography variant="body1" gutterBottom>
            {t('deleteMessage')}
          </Typography>
          <Button
            className={classes.deleteButton}
            startIcon={<DeleteIcon />}
            onClick={openDeleteModal}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <DeleteConfirmation />
    </Dialog>
  )
}

PublishGoodInfo.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  ggood: PropTypes.any
}

export default PublishGoodInfo

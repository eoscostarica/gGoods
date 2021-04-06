import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FilledInput from '@material-ui/core/FilledInput'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'

import styles from './styles'

const useStyles = makeStyles(styles)

const AUTHOR_LIST = [
  {
    name: 'All'
  },
  {
    name: 'Other'
  },
  {
    name: 'Animal Sanctuary'
  },
  {
    name: 'Pet Rescue'
  },
  {
    name: 'Pet Rescue'
  },
  {
    name: 'Pet Rescue'
  }
]

const AMOUNT_LIST = [
  {
    name: '$1 or less'
  },
  {
    name: '$1-$5'
  },
  {
    name: '$5-$10'
  },
  {
    name: 'More than $10'
  }
]
const GoodsFilter = ({ open, handlerOpen }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()
  const { t } = useTranslation('filterGoodsRoute')

  return (
    <Dialog
      open={open}
      onClose={handlerOpen}
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
            onClick={handlerOpen}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography variant="h6" gutterBottom>
            {t('title')}
          </Typography>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-amount"> Keyword </InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box className={classes.sectionBox}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {t('subtitle1')}
              </Typography>
              {AUTHOR_LIST.map((game, index) => (
                <Chip
                  key={index}
                  label={game.name}
                  clickable
                  className={classes.chip}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBoxDouble}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                style={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {t('subtitle2')}
              </Typography>
              <Box className={classes.sectionBox}>
                {AMOUNT_LIST.map(game => (
                  <Chip
                    key={game.name}
                    label={game.name}
                    clickable
                    className={classes.chip}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.sectionBox}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" className={classes.mainButton}>
                Apply Filter
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button className={classes.mainButton}> Cancel </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}

GoodsFilter.propTypes = {
  open: PropTypes.bool,
  handlerOpen: PropTypes.func
}

export default GoodsFilter

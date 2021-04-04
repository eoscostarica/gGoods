import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Header = ({ t, attempts, onResetGame }) => {
  const classes = useStyles()

  return (
    <Box className={classes.header}>
      <Button variant="contained" onClick={onResetGame}>
        {t('reset')}
      </Button>
      <Typography className={classes.title}>
        {t('attempts')}: {attempts}
      </Typography>
    </Box>
  )
}

Header.propTypes = {
  t: PropTypes.func,
  attempts: PropTypes.number,
  onResetGame: PropTypes.func
}

export default Header

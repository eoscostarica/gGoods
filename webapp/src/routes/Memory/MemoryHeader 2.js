import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Header = ({ attempts, resetGame }) => {
  const classes = useStyles()

  return (
    <Box className={classes.header}>
      <Button variant="contained" onClick={resetGame}>
        reset
      </Button>
      <Typography className={classes.title}>Attempts: {attempts}</Typography>
    </Box>
  )
}

Header.propTypes = {
  attempts: PropTypes.number,
  resetGame: PropTypes.func
}

export default Header

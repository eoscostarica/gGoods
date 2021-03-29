import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Header = ({ attempts, resetGame }) => {
  const classes = useStyles()

  return (
    <header>
      <div className={classes.title}>React-Memory</div>
      <div>
        <button className={classes.resetBtn} onClick={resetGame}>
          reset
        </button>
      </div>
      <div className={classes.title}>Attempts: {attempts}</div>
    </header>
  )
}

Header.propTypes = {
  attempts: PropTypes.number,
  resetGame: PropTypes.func
}

export default Header

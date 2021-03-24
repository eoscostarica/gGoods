import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './styles'

const useStyles = makeStyles(styles)
const LEVEL = {
  1: 'Right1',
  2: 'Right2',
  0: 'Current',
  '-1': 'Left1',
  '-2': 'Left2'
}

const Item = ({ level, id }) => {
  const classes = useStyles()

  return (
    <Box className={clsx(classes.item, classes[`level${LEVEL[level]}`])}>
      <span>{id}</span>
    </Box>
  )
}

Item.propTypes = {
  level: PropTypes.any,
  id: PropTypes.any
}

export default Item

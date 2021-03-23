import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const TemplateListItem = ({ addToCanvas, zIndex, propertyType, url }) => {
  const classes = useStyles()

  const localAddToCanvas = e => {
    e.preventDefault()
    addToCanvas(e.target, propertyType, zIndex)
  }

  return (
    <Box onClick={e => localAddToCanvas(e)} className={classes.itemBox}>
      <img alt="avatar" src={url} />
    </Box>
  )
}

TemplateListItem.propTypes = {
  addToCanvas: PropTypes.func,
  zIndex: PropTypes.any,
  propertyType: PropTypes.any,
  url: PropTypes.string
}

export default TemplateListItem

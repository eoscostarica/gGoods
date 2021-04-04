import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const TemplateListItem = ({ addToCanvas, propertyType, url }) => {
  const classes = useStyles()

  const localAddToCanvas = () => {
    addToCanvas(propertyType, url)
  }

  return (
    <img
      alt="avatar"
      src={url}
      width="100%"
      height="100%"
      onClick={localAddToCanvas}
      className={classes.itemBox}
    />
  )
}

TemplateListItem.propTypes = {
  addToCanvas: PropTypes.func,
  propertyType: PropTypes.any,
  url: PropTypes.string
}

export default TemplateListItem

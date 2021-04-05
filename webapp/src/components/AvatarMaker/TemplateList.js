import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import TemplateListItem from './TemplateListItem'
import styles from './styles'

const useStyles = makeStyles(styles)

const TemplateList = ({ addToCanvas, propertyType, data = [] }) => {
  const classes = useStyles()

  return (
    <Box className={classes.itemsWrapper}>
      {data.map(item => (
        <TemplateListItem
          url={item}
          propertyType={propertyType}
          addToCanvas={addToCanvas}
          key={Math.random()}
        />
      ))}
    </Box>
  )
}

TemplateList.propTypes = {
  addToCanvas: PropTypes.func,
  propertyType: PropTypes.any,
  data: PropTypes.array
}

export default TemplateList

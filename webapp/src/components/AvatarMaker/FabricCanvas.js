import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fabric } from 'fabric'
import { makeStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const FabricCanvas = ({ activeProperty, onGetDataUrl }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [canvas, setCanvas] = useState()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const updateCanvasforImage = next => {
    if (next) {
      let toRemove
      canvas.forEachObject(object => {
        if (object.the_type === next.the_type) {
          toRemove = object
        }
      })

      canvas.remove(toRemove)

      if (next.the_type === 'bg') {
        canvas.backgroundColor = next.backgroundColor
        canvas.renderAll()
        onGetDataUrl(canvas)

        return
      }

      canvas.add(next)
      canvas.moveTo(next, next.zIndex)

      onGetDataUrl(canvas)
    }
  }

  const initCanvas = isMobile =>
    new fabric.StaticCanvas('main-canvas', {
      preserveObjectStacking: true,
      height: 375,
      width: isMobile ? 310 : 400,
      backgroundColor: '#CFCFCF'
    })

  useEffect(() => {
    setCanvas(initCanvas(isMobile))
  }, [isMobile])

  useEffect(() => {
    updateCanvasforImage(activeProperty)
  }, [activeProperty])

  return (
    <Box className={classes.mainCanvasContainer}>
      <Box className={classes.previewBow}>
        <canvas id="main-canvas" />
      </Box>
    </Box>
  )
}

FabricCanvas.propTypes = {
  activeProperty: PropTypes.object,
  onGetDataUrl: PropTypes.func
}

export default FabricCanvas

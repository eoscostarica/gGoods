import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fabric } from 'fabric'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const FabricCanvas = ({ activeProperty }) => {
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
        canvas.setBackgroundImage(next)
        canvas.renderAll()
        return
      }

      canvas.add(next)
      canvas.moveTo(next, next.zIndex)
    }
  }

  const saveToCanvas = () => {
    const link = document.createElement('a')
    link.href = canvas.toDataURL({ format: 'png' })
    link.download = 'avatar.png'
    link.click()
  }

  const initCanvas = isMobile =>
    new fabric.StaticCanvas('main-canvas', {
      preserveObjectStacking: true,
      height: 375,
      width: isMobile ? 310 : 400
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
        <Box className={classes.bottomBox}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Name your animal"
          />
          <Button className={classes.btnPublish} onClick={saveToCanvas}>
            PUBLISH
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

FabricCanvas.propTypes = {
  activeProperty: PropTypes.object
}

export default FabricCanvas
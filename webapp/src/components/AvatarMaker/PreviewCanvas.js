import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import RefreshIcon from '@material-ui/icons/Refresh'
import IconButton from '@material-ui/core/IconButton'

import styles from './styles'

const DPR = 1
const useStyles = makeStyles(styles)

const PreviewCanvas = ({
  activeProperty,
  backgroundColor,
  onGetDataUrl,
  onResetCanvas
}) => {
  const classes = useStyles()
  const canvas = useRef()

  const setupCanvas = canvasEle => {
    const rect = canvasEle.getBoundingClientRect()

    canvasEle.width = rect.width * DPR
    canvasEle.height = rect.height * DPR

    const ctx = canvasEle.getContext('2d')

    ctx.scale(DPR, DPR)

    return ctx
  }

  const loadCanvasImg = (sources, callback) => {
    const images = {}

    for (const src in sources) {
      if (src !== 'backgroundColor') {
        images[src] = new Image()
        images[src].onload = () => {
          callback(images)
        }
        images[src].src = sources[src]
      }
    }
  }

  useEffect(() => {
    if (canvas.current) {
      const ctx = setupCanvas(canvas.current)

      loadCanvasImg(activeProperty, images => {
        ctx.fillStyle = 'transparent'
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height)

        for (const name in images) {
          ctx.drawImage(
            images[name],
            0,
            0,
            canvas.current.width,
            canvas.current.height
          )
        }
      })

      onGetDataUrl(canvas.current)
    }
  }, [activeProperty])

  return (
    <Box className={classes.mainCanvasContainer}>
      <Box className={classes.previewBow} style={{ backgroundColor }}>
        <canvas ref={canvas} className={classes.mainCanvas} />
        <Box className={classes.bottomBox}>
          <IconButton variant="contained" size="small" onClick={onResetCanvas}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

PreviewCanvas.propTypes = {
  activeProperty: PropTypes.object,
  backgroundColor: PropTypes.string,
  onGetDataUrl: PropTypes.func,
  onResetCanvas: PropTypes.func
}

export default PreviewCanvas

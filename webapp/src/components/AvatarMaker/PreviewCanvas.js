import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ReplayIcon from '@material-ui/icons/Replay'

import styles from './styles'

const DPR = 1
const useStyles = makeStyles(styles)

const PreviewCanvas = ({ activeProperty, onGetDataUrl, onResetCanvas }) => {
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
        ctx.fillStyle = activeProperty.backgroundColor
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
      <Box className={classes.previewBow}>
        <canvas ref={canvas} className={classes.mainCanvas} />
        <Box className={classes.bottomBox}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onResetCanvas}
            startIcon={<ReplayIcon />}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

PreviewCanvas.propTypes = {
  activeProperty: PropTypes.object,
  onGetDataUrl: PropTypes.func,
  onResetCanvas: PropTypes.func
}

export default PreviewCanvas

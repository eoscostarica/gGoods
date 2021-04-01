import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'

import Item from './Item'
import styles from './styles'

const useStyles = makeStyles(styles)

const Carousel = ({ items = [] }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [activeItems, setActiveItems] = useState()
  const [active, setActive] = useState()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const generateItems = (activeValue = 0) => {
    let level
    const carouselItems = []
    const leftValue = activeValue - (isMobile ? 1 : 2)
    const rightValue = activeValue + (isMobile ? 2 : 3)

    for (let i = leftValue; i < rightValue; i++) {
      let index = i

      if (i < 0) {
        index = items.length + i
      } else if (i >= items.length) {
        index = i % items.length
      }

      level = activeValue - i

      carouselItems.push({
        ...items[index],
        level
      })
    }

    setActiveItems(carouselItems)
  }

  const moveLeft = () => {
    const activeValie = active - 1 < 0 ? items.length - 1 : active - 1

    generateItems(activeValie)
    setActive(activeValie)
  }

  const moveRight = () => {
    const newActive = (active + 1) % items.length

    generateItems(newActive)
    setActive(newActive)
  }

  useEffect(() => {
    generateItems(active)
  }, [isMobile])

  useEffect(() => {
    generateItems(active)
    setActive(0)
  }, [])

  return (
    <Box className={classes.carousel}>
      <IconButton
        className={clsx(classes.arrow, classes.leftArrow)}
        onClick={moveLeft}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Box className={classes.box}>
        {(activeItems || []).map(({ id, image, level, backgroundColor }) => (
          <Item
            key={id}
            id={id}
            level={level}
            image={image}
            backgroundColor={backgroundColor}
          />
        ))}
      </Box>

      <IconButton className={classes.arrow} onClick={moveRight}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}

Carousel.propTypes = {
  items: PropTypes.array
}

export default Carousel

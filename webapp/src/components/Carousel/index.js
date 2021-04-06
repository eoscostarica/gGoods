import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import clsx from 'clsx'

import { mainConfig } from '../../config'

import Item from './Item'
import styles from './styles'

const useStyles = makeStyles(styles)

const Carousel = ({ items = [], isLoading, title, secondaryText }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [activeItems, setActiveItems] = useState()
  const [active, setActive] = useState()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const generateItems = (activeValue = 0) => {
    const carouselItems = []

    if (items.length < 3) {
      carouselItems.push({
        ...items[activeValue],
        level: 0
      })
      setActiveItems(carouselItems)

      return
    }

    let level
    let leftValue = activeValue - (isMobile ? 1 : 2)
    let rightValue = activeValue + (isMobile ? 2 : 3)

    if (items.length < 5) {
      leftValue = activeValue - (isMobile ? 1 : 1)
      rightValue = activeValue + (isMobile ? 2 : 2)
    }

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
    generateItems(0)
    setActive(0)
  }, [isMobile, items])

  return (
    <Box className={classes.carousel}>
      <Box className={classes.box}>
        {(activeItems || []).map(({ id, level, metadata, issuer }) => (
          <Item
            key={id}
            id={id}
            level={level}
            image={`${mainConfig.ipfsUrl}/ipfs/${metadata.imageSmall}`}
            backgroundColor={metadata.backgroundColor}
            isLoading={isLoading}
            name={metadata.name}
            description={`${secondaryText} ${issuer}`}
            pathname={`/good/${id}`}
          />
        ))}
      </Box>
      <Box className={classes.navigationBox}>
        <IconButton
          className={clsx(classes.arrow, classes.leftArrow)}
          onClick={moveLeft}
          disabled={isLoading}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography align="center">{`${items.length} ${title}`}</Typography>
        <IconButton
          className={classes.arrow}
          onClick={moveRight}
          disabled={isLoading}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
Carousel.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  secondaryText: PropTypes.string
}
Carousel.defaultProps = {
  items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  secondaryText: 'by'
}
export default Carousel

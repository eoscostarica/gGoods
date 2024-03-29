import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { Link as LinkRouter } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
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

const ItemContent = ({
  level,
  isLoading,
  image,
  classes,
  description,
  name,
  pathname
}) => {
  if (isLoading) {
    return level === 0 ? (
      <Box className={classes.boxLoading}>
        <CircularProgress />
      </Box>
    ) : null
  }

  if (level === 0)
    return (
      <LinkRouter className={classes.link} to={{ pathname }}>
        <img src={image} alt="ggood item" />
        <Box className={clsx(classes.legend, classes[`legend${LEVEL[level]}`])}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
      </LinkRouter>
    )

  return (
    <>
      <img src={image} alt="ggood item" />
      <Box className={clsx(classes.legend, classes[`legend${LEVEL[level]}`])}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </>
  )
}

ItemContent.propTypes = {
  level: PropTypes.any,
  image: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  description: PropTypes.string,
  classes: PropTypes.any,
  pathname: PropTypes.string
}

const Item = ({
  level,
  image,
  backgroundColor,
  isLoading,
  description,
  name,
  pathname
}) => {
  const classes = useStyles()

  return (
    <Box
      className={clsx(classes.item, classes[`level${LEVEL[level]}`])}
      style={{ backgroundColor: isLoading ? '#e0e0e0' : backgroundColor }}
    >
      <ItemContent
        level={level}
        image={image}
        isLoading={isLoading}
        classes={classes}
        name={name}
        description={description}
        pathname={pathname}
      />
    </Box>
  )
}

Item.propTypes = {
  backgroundColor: PropTypes.string,
  level: PropTypes.any,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool,
  pathname: PropTypes.string
}

export default Item

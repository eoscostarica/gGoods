import React, { useEffect, useState } from 'react'
import { Draggable } from 'pigeon-maps'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close'

import BaseMap from '../BaseMap'
import styles from './styles'

const useStyles = makeStyles(styles)

const PlaceYourGoodMap = ({ setAnchors, availableGoods, saveClicked }) => {
  const classes = useStyles()
  const [goods, setGoods] = useState(availableGoods)
  const [open, setOpen] = useState(false)
  const [draggables, setDraggables] = useState([])

  const handleListItemClick = good => {
    setDraggables(prev => [
      ...prev,
      {
        id: good.id,
        name: good.name,
        coordinates: [18.15509507688694, -70.17413938054553],
        image: good.image
      }
    ])

    setOpen(false)

    setGoods(prev => prev.filter(el => el.id !== good.id))
  }

  const handleSetDraggable = (coordinates, id) => {
    // console.log(coordinates)
    setDraggables(() =>
      draggables.map(item =>
        item.id === id ? { ...item, coordinates: coordinates } : item
      )
    )
  }

  useEffect(() => {
    if (saveClicked) setAnchors(draggables)
  }, [saveClicked])

  return (
    <BaseMap>
      {draggables.map((dragg, index) => (
        <Draggable
          key={index}
          anchor={dragg.coordinates}
          onDragEnd={value => {
            handleSetDraggable(value, dragg.id)
          }}
        >
          <img src={dragg.image} width={100} hceight={95} alt="" />
        </Draggable>
      ))}
      <Grid className={classes.selectGoodGrid} container justify="flex-start">
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          onClose={() => setOpen(false)}
          color="primary"
        >
          Select good
        </Button>
        <SwipeableDrawer
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(true)}
          anchor="bottom"
          open={open}
        >
          <Grid container justify="flex-end">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid container justify="flex-start">
            <List className={classes.goodsList}>
              {goods.map((good, index) => (
                <ListItem
                  onClick={() => handleListItemClick(good)}
                  button
                  key={index}
                >
                  <ListItemIcon>
                    <img src={good.image} width={40} hceight={35} alt="" />
                  </ListItemIcon>
                  <ListItemText primary={good.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </SwipeableDrawer>
      </Grid>
    </BaseMap>
  )
}

PlaceYourGoodMap.propTypes = {
  setAnchors: PropTypes.func,
  availableGoods: PropTypes.array,
  saveClicked: PropTypes.bool
}

export default PlaceYourGoodMap

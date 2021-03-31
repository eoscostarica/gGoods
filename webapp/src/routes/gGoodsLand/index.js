import React, { useState, forwardRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

import styles from './styles'
import PlaceYourGoodMap from '../../components/PlaceYourGood'
import GoodsMap from '../../components/GoodsMap'
import Panda from '../../images/assets/panda.svg'
import Koala from '../../images/assets/koala.svg'

const useStyles = makeStyles(styles)

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const gGoodsLand = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [newAnchor, setNewAnchor] = useState()
  const [anchors, setAnchors] = useState([
    { img: Koala, name: 'Lisa the Koala', coordinates: [57.02715, -70.0011] },
    { img: Panda, name: 'Mark the Panda', coordinates: [9.94323, -84.0541] }
  ])

  const saveNewAnchor = () => {
    setAnchors([...anchors, newAnchor])
    setOpen(false)
  }

  return (
    <Grid>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Place a good
            </Typography>
            <Button
              disabled={!newAnchor}
              autoFocus
              color="inherit"
              onClick={saveNewAnchor}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <PlaceYourGoodMap setAnchors={anchor => setNewAnchor(anchor)} />
      </Dialog>
      <GoodsMap anchors={anchors} placeAnewGood={() => setOpen(true)} />
    </Grid>
  )
}

export default gGoodsLand

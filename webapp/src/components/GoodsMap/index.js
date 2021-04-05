import React, { useState, Fragment } from 'react'
import { Overlay } from 'pigeon-maps'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import BaseMap from '../BaseMap'
import styles from './styles'

const useStyles = makeStyles(styles)

const GoodsMap = ({ placeAnewGood, anchors }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(undefined)
  const [center, setCenter] = useState([50.879, 4.6997])
  const [currentClickedGood, setCurrentClickedGood] = useState()
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <BaseMap center={center}>
      {anchors.map((anchor, index) => (
        <Overlay
          key={index}
          anchor={
            typeof anchor.coordinates === 'string'
              ? JSON.parse(anchor.coordinates)
              : anchor.coordinates
          }
          offset={[120, 79]}
        >
          <img
            id={`good-${index}`}
            className={classes.good}
            onClick={event => {
              setAnchorEl(() => event.target)
              setCurrentClickedGood(anchor)
            }}
            src={anchor.image}
            width={150}
            height={150}
            alt=""
          />
        </Overlay>
      ))}
      {currentClickedGood && (
        <Popover
          className={classes.popover}
          id={id}
          open={open}
          anchorEl={currentClickedGood}
          onClose={() => setAnchorEl(undefined)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Typography>
            <strong>Ggood Name: </strong>
            {currentClickedGood.name}
          </Typography>
          <Typography>
            <strong>Organization: </strong>Jaguar Rescue Centre
          </Typography>
          <Typography>
            <strong>Creation date: </strong>
            {`${new Date()}`}
          </Typography>
        </Popover>
      )}
      <Grid className={classes.placeGrid} container justify="flex-end">
        <Button variant="contained" color="secondary" onClick={placeAnewGood}>
          Place a new Good
        </Button>
      </Grid>
      <Grid container justify="center">
        <Autocomplete
          className={classes.root}
          options={anchors}
          autoHighlight
          getOptionLabel={option => option.name}
          renderOption={option => (
            <Fragment>
              <Grid
                onClick={() => setCenter(option.coordinates)}
                container
                justify="flex-start"
              >
                <span>
                  <img src={option.img} width={35} height={20} alt="" />
                </span>
                <Typography>{option.name}</Typography>
              </Grid>
            </Fragment>
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Search a good"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'good'
              }}
            />
          )}
        />
      </Grid>
    </BaseMap>
  )
}

GoodsMap.propTypes = {
  placeAnewGood: PropTypes.func,
  anchors: PropTypes.array
}

export default GoodsMap

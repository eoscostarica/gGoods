import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import RoomIcon from '@material-ui/icons/Room'
import PropTypes from 'prop-types'
import { Map, ZoomControl } from 'pigeon-maps'

import styles from './styles'
import { mapConfig } from '../../config'

const useStyles = makeStyles(styles)

const LocationPin = ({ text }) => (
  <div className="pin">
    <RoomIcon />
    <p className="pin-text">{text}</p>
  </div>
)

const BaseMap = ({ children, center }) => {
  const classes = useStyles()

  const MAPTILER_ACCESS_TOKEN = mapConfig.apiKey
  const MAP_ID = 'topo'

  const mapTiler = (x, y, z, dpr) =>
    `${mapConfig.mapBaseUrl}${MAP_ID}/256/${z}/${x}/${y}${
      dpr >= 2 ? '@2x' : ''
    }.png?key=${MAPTILER_ACCESS_TOKEN}`

  return (
    <Grid container justify="center" className={classes.mapContainer}>
      <Map
        center={center}
        provider={mapTiler}
        animate
        className={classes.map}
        height="90vh"
        minZoom={1}
        defaultZoom={3}
      >
        {children}
        <ZoomControl />
      </Map>
    </Grid>
  )
}

LocationPin.propTypes = {
  text: PropTypes.string
}

BaseMap.propTypes = {
  children: PropTypes.node,
  center: PropTypes.array
}

export default BaseMap

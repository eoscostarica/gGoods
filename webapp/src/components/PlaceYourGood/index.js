import React, { useState } from 'react'
import { Draggable } from 'pigeon-maps'
import PropTypes from 'prop-types'

import BaseMap from '../BaseMap'
import Lola from '../../images/assets/lola.svg'

const PlaceYourGoodMap = ({ setAnchors }) => {
  const [anchor, setAnchor] = useState([50.879, 4.6997])
  return (
    <BaseMap>
      <Draggable
        offset={[60, 87]}
        anchor={anchor}
        onDragEnd={value => {
          setAnchor(value)
          setAnchors({ img: Lola, name: 'Lola the Jaguar', coordinates: value })
        }}
      >
        <img src={Lola} width={100} height={95} alt="" />
      </Draggable>
    </BaseMap>
  )
}

PlaceYourGoodMap.propTypes = {
  setAnchors: PropTypes.func
}

export default PlaceYourGoodMap

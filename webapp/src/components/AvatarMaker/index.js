import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import { fabric } from 'fabric'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import { SketchPicker } from 'react-color'
import Tab from '@material-ui/core/Tab'

import FabricCanvas from './FabricCanvas'
import TemplateList from './TemplateList'
import {
  decolist,
  mouthlist,
  baselist,
  eyeslist
} from '../../images/templates/templatelist'

import styles from './styles'

const useStyles = makeStyles(styles)

const a11yProps = index => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const TabPanel = ({ children, value, index, classes }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
  >
    {value === index && children}
  </div>
)

TabPanel.propTypes = {
  children: PropTypes.object,
  value: PropTypes.any,
  index: PropTypes.number,
  classes: PropTypes.any
}

const AvatarMaker = ({ onGetDataUrl }) => {
  const classes = useStyles()
  const [activeProperty, setActiveProperty] = useState(null)
  const [value, setValue] = useState()
  const [color, setColor] = useState()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const createNewFabric = (element, props) =>
    new fabric.Image(element, { ...props, width: 400, height: 400 })

  const addToCanvas = (imgElement, propertyType, zIndex) => {
    const imgCanvas = createNewFabric(imgElement, {
      the_type: propertyType,
      zIndex
    })

    setActiveProperty(imgCanvas)
  }

  const addCanvasBgColor = backgroundColor => {
    const imgCanvasNewBgColor = createNewFabric(activeProperty, {
      the_type: 'bg',
      zIndex: 2,
      backgroundColor
    })

    setActiveProperty(imgCanvasNewBgColor)
  }

  useEffect(() => {
    setValue(0)
  }, [])

  return (
    <Box className={classes.boxAvatar}>
      <Grid>
        <FabricCanvas
          activeProperty={activeProperty}
          onGetDataUrl={onGetDataUrl}
          bgColor={color}
        />
      </Grid>
      <Grid>
        <Tabs
          value={value || 0}
          onChange={handleChange}
          textColor="primary"
          classes={{
            flexContainer: classes.flexContainer,
            indicator: classes.tabIndicator
          }}
        >
          <Tab
            label="Base"
            classes={{
              root: classes.rootTab,
              selected: classes.tabSelected
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Eyes"
            classes={{
              root: classes.rootTab,
              selected: classes.tabSelected
            }}
            {...a11yProps(1)}
          />
          <Tab
            label="Mouth"
            classes={{
              root: classes.rootTab,
              selected: classes.tabSelected
            }}
            {...a11yProps(2)}
          />
          <Tab
            label="Deco"
            classes={{
              root: classes.rootTab,
              selected: classes.tabSelected
            }}
            {...a11yProps(3)}
          />
          <Tab
            label="Background"
            classes={{
              root: classes.rootTab,
              selected: classes.tabSelected
            }}
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={value} index={0} classes={classes}>
          <TemplateList
            data={baselist}
            propertyType="base"
            zIndex={0}
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={1} classes={classes}>
          <TemplateList
            data={eyeslist}
            propertyType="eyes"
            zIndex={2}
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={2} classes={classes}>
          <TemplateList
            data={mouthlist}
            propertyType="mouth"
            zIndex={2}
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={3} classes={classes}>
          <TemplateList
            data={decolist}
            propertyType="deco"
            zIndex={2}
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={4} classes={classes}>
          <SketchPicker
            className={classes.colorPicker}
            color={color}
            onChangeComplete={color => {
              setColor(color.hex)
              addCanvasBgColor(color.hex)
            }}
          />
        </TabPanel>
      </Grid>
    </Box>
  )
}

AvatarMaker.propTypes = {
  onGetDataUrl: PropTypes.func
}

AvatarMaker.defaultProp = {
  onGetDataUrl: () => {}
}

export default memo(AvatarMaker)

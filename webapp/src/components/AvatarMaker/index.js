import React, { memo, useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import PreviewCanvas from './PreviewCanvas'
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
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
  >
    {value === index && children}
  </Box>
)

TabPanel.propTypes = {
  children: PropTypes.object,
  value: PropTypes.any,
  index: PropTypes.number,
  classes: PropTypes.any
}

const AvatarMaker = ({ onGetDataUrl, color, onChangeColor }) => {
  const classes = useStyles()
  const [activeProperty, setActiveProperty] = useState()
  const [value, setValue] = useState()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const resetAvatarCreator = (element, props) =>
    setActiveProperty({
      backgroundColor: '#CFCFCF',
      base: baselist[0]
    })

  const addToCanvas = (name, url) => {
    setActiveProperty({ ...activeProperty, [name]: url })
  }

  const addCanvasBgColor = backgroundColor => {
    setActiveProperty({ ...activeProperty, backgroundColor })
  }

  useEffect(() => {
    setValue(0)
    setActiveProperty({
      backgroundColor: '#CFCFCF',
      base: baselist[0]
    })
  }, [])

  useEffect(() => {
    if (!color) {
      return
    }

    addCanvasBgColor(color)
  }, [color])

  return (
    <Box className={classes.boxAvatar}>
      <Grid>
        <PreviewCanvas
          activeProperty={activeProperty}
          onGetDataUrl={onGetDataUrl}
          onResetCanvas={resetAvatarCreator}
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
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={1} classes={classes}>
          <TemplateList
            data={eyeslist}
            propertyType="eyes"
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={2} classes={classes}>
          <TemplateList
            data={mouthlist}
            propertyType="mouth"
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={3} classes={classes}>
          <TemplateList
            data={decolist}
            propertyType="deco"
            addToCanvas={addToCanvas}
          />
        </TabPanel>
        <TabPanel value={value} index={4} classes={classes}>
          <SketchPicker
            className={classes.colorPicker}
            color={color}
            onChangeComplete={onChangeColor}
          />
        </TabPanel>
      </Grid>
    </Box>
  )
}

AvatarMaker.propTypes = {
  onGetDataUrl: PropTypes.func,
  color: PropTypes.string,
  onChangeColor: PropTypes.func
}

AvatarMaker.defaultProp = {
  onGetDataUrl: () => {}
}

export default memo(AvatarMaker)

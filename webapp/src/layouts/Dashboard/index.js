import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import styled, { createGlobalStyle } from 'styled-components'
import { spacing } from '@material-ui/system'
import Hidden from '@material-ui/core/Hidden'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiPaper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { isWidthUp } from '@material-ui/core/withWidth'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PageTitle from '../../components/PageTitle'
import { mainConfig } from '../../config'

import styles from './styles'

const drawerWidth = 260

const useStyles = makeStyles((theme) => styles(theme, drawerWidth))

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.paper};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`

const Paper = styled(MuiPaper)(spacing)

const Dashboard = ({ children, width, ual, theme, onThemeChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation('routes')
  const location = useLocation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <GlobalStyle />
      <PageTitle title={t(`${location.pathname}>title`, mainConfig.title)} />
      <div className={classes.drawer}>
        <Hidden mdUp implementation="js">
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <Sidebar PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </div>
      <div className={classes.appContent}>
        <Header
          onDrawerToggle={handleDrawerToggle}
          ual={ual}
          theme={theme}
          onThemeChange={onThemeChange}
        />
        <Paper
          className={classes.mainContent}
          p={isWidthUp('lg', width) ? 6 : 4}
        >
          <Box className={classes.subHeader}>
            <Typography variant="h3">
              {t(`${location.pathname}>heading`, '')}
            </Typography>
            <Box className={classes.network}>
              <Typography component="p" variant="h5">
                {mainConfig.title}
              </Typography>
              <img
                src={mainConfig.logo}
                alt="logo"
                width="56px"
                height="56px"
              />
            </Box>
          </Box>
          {children}
        </Paper>
        <Footer />
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  children: PropTypes.node,
  width: PropTypes.any,
  ual: PropTypes.any,
  theme: PropTypes.string,
  onThemeChange: PropTypes.func
}

export default Dashboard

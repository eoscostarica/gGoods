/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import {
  Box,
  Chip,
  Collapse,
  Drawer as MuiDrawer,
  Grid,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { darken } from 'polished'
import { NavLink as RouterNavLink, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import { mainConfig } from '../../config'
import routes from '../../routes'

import styles from './styles'

const useStyles = makeStyles((theme) => styles(theme, darken))

const NavLink = forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const ExternalLink = forwardRef(({ to, children, className }, ref) => (
  <a
    ref={ref}
    href={to}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
))

ExternalLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
}

const DashboardIcon = () => (
  <img alt={mainConfig.title} src="/logo.png" width="200px" height="auto" />
)

const SidebarCategory = ({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) => {
  return (
    <MuiListItem className={classes.category} {...rest}>
      {icon}
      <ListItemText className={classes.categoryText}>{name}</ListItemText>
      {isCollapsable ? (
        isOpen ? (
          <ExpandMore className={classes.categoryIconMore} />
        ) : (
          <ExpandLess className={classes.categoryIconLess} />
        )
      ) : null}
      {badge ? <Chip className={classes.chip} label={badge} /> : ''}
    </MuiListItem>
  )
}

SidebarCategory.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.node,
  classes: PropTypes.any,
  isOpen: PropTypes.bool,
  isCollapsable: PropTypes.bool,
  badge: PropTypes.string
}

const SidebarLink = ({ classes, name, icon, to, badge }) => (
  <MuiListItem
    className={classes.link}
    button
    dense
    component={NavLink}
    exact
    to={to}
    activeClassName="active"
    href={to}
  >
    {icon}
    <ListItemText className={classes.categoryText}>{name}</ListItemText>
    {badge ? <Chip className={classes.chip} label={badge} /> : ''}
  </MuiListItem>
)

SidebarLink.propTypes = {
  icon: PropTypes.node,
  name: PropTypes.string,
  to: PropTypes.string,
  badge: PropTypes.string,
  classes: PropTypes.any
}

const Sidebar = ({ style, staticContext, location, ...rest }) => {
  const { t } = useTranslation('routes')
  const classes = useStyles()
  const initOpenRoutes = () => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname

    let _routes = {}

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0
      const isOpen = route.open
      const isHome = route.containsHome && pathName === '/'

      _routes = Object.assign({}, _routes, {
        [index]: isActive || isOpen || isHome
      })
    })

    return _routes
  }

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes())

  const toggle = (index) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      (item) =>
        openRoutes[index] ||
        setOpenRoutes((openRoutes) =>
          Object.assign({}, openRoutes, { [item]: false })
        )
    )

    // Toggle selected element
    setOpenRoutes((openRoutes) =>
      Object.assign({}, openRoutes, { [index]: !openRoutes[index] })
    )
  }

  return (
    <MuiDrawer className={classes.drawer} variant="permanent" {...rest}>
      <Box className={classes.box}>
        <DashboardIcon />
      </Box>
      <PerfectScrollbar className={classes.scrollbar}>
        <MuiList className={classes.list} disablePadding>
          {routes
            .filter(({ name }) => !!name)
            .map((category, index) => (
              <MuiListItem className={classes.listItem} key={index}>
                {category.header ? (
                  <Typography className={classes.sidebarSection}>
                    {t(category.header)}
                  </Typography>
                ) : null}

                {category.children ? (
                  <Box width="100%">
                    <SidebarCategory
                      classes={classes}
                      isOpen={!openRoutes[index]}
                      name={t(`${category.path}>sidebar`)}
                      icon={category.icon}
                      onClick={() => toggle(index)}
                      isCollapsable
                      button
                    />

                    <Collapse
                      in={openRoutes[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {category.children.map((route, index) => (
                        <SidebarLink
                          key={`sidebar-link${index}`}
                          name={route.name}
                          to={route.path}
                          icon={route.icon}
                          badge={route.badge}
                          classes={classes}
                        />
                      ))}
                    </Collapse>
                  </Box>
                ) : (
                  <SidebarCategory
                    classes={classes}
                    isCollapsable={false}
                    name={t(
                      category.path.includes('http')
                        ? category.name
                        : `${category.path}>sidebar`
                    )}
                    to={category.path}
                    activeClassName="active"
                    component={
                      category.path.includes('http') ? ExternalLink : NavLink
                    }
                    icon={category.icon}
                    exact
                    badge={category.badge}
                  />
                )}
              </MuiListItem>
            ))}
        </MuiList>
      </PerfectScrollbar>
      <div className={classes.sidebarFooter}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography
              className={classes.sidebarFooterSubText}
              variant="body2"
            >
              {t('footerText')}{' '}
              <a
                href="https://eoscostarica.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                EOS Costa Rica
              </a>
            </Typography>
            <Typography className={classes.sidebarFooterSubText} />
          </Grid>
        </Grid>
      </div>
    </MuiDrawer>
  )
}

Sidebar.propTypes = {
  style: PropTypes.any,
  staticContext: PropTypes.any,
  location: PropTypes.any
}

export default withRouter(Sidebar)

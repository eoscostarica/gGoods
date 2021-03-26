import React, { lazy } from 'react'
import AppsIcon from '@material-ui/icons/Apps'
import HomeIcon from '@material-ui/icons/Home'
import FilterVintageIcon from '@material-ui/icons/FilterVintage'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import InfoIcon from '@material-ui/icons/Info'
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined'
import DashboardIcon from '@material-ui/icons/Dashboard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Home = lazy(() => import('./Home'))
const Organizations = lazy(() => import('./Organizations'))
const Organization = lazy(() => import('./Organization'))
const Goods = lazy(() => import('./Goods'))
const GoodPage = lazy(() => import('./GoodPage'))
const Games = lazy(() => import('./Games'))
const YourCollection = lazy(() => import('./YourCollection'))
const CreateTemplate = lazy(() => import('./CreateTemplate'))
const PutOnSale = lazy(() => import('./PutOnSale'))
const About = lazy(() => import('./About'))
const Page404 = lazy(() => import('./Route404'))
const Paypal = lazy(() => import('./Paypal'))

const routes = [
  {
    name: 'home',
    icon: <HomeIcon />,
    component: Home,
    path: '/',
    exact: true
  },
  {
    name: 'organizations',
    icon: <FilterVintageIcon />,
    component: Organizations,
    path: '/organizations',
    exact: true
  },
  {
    path: '/organization/:id',
    component: Organization
  },
  {
    name: 'goods',
    icon: <AppsIcon />,
    component: Goods,
    path: '/goods',
    exact: true
  },
  {
    name: 'PayPal',
    icon: <AppsIcon />,
    component: Paypal,
    path: '/paypal-integration',
    exact: true
  },
  {
    name: 'putOnSale',
    icon: <AppsIcon />,
    component: PutOnSale,
    path: '/put-on-sale',
    exact: true
  },
  {
    header: 'docs',
    name: 'about',
    icon: <InfoIcon />,
    component: About,
    path: '/about',
    exact: true
  },
  {
    path: '/good/:id',
    component: GoodPage
  },
  {
    name: 'games',
    icon: <SportsEsportsIcon />,
    component: Games,
    path: '/games',
    exact: true
  },
  {
    name: 'your-collection',
    icon: <CollectionsBookmarkOutlinedIcon />,
    component: YourCollection,
    path: '/your-collection',
    exact: true
  },
  {
    name: 'about',
    icon: <InfoIcon />,
    component: About,
    path: '/about',
    exact: true
  },
  {
    name: 'createTemplate',
    icon: <DashboardIcon />,
    component: CreateTemplate,
    path: '/create-template',
    exact: true
  },
  {
    component: Page404
  }
]

export default role => {
  const routesForRole = routes.filter(
    route => !route.roles || route.roles.includes(role)
  )

  return {
    sidebar: routesForRole.filter(route => !!route.name),
    browser: routesForRole
      .reduce(
        (routes, route) => [
          ...routes,
          ...(route.childrens ? route.childrens : [route])
        ],
        []
      )
      .filter(route => !!route.component)
  }
}

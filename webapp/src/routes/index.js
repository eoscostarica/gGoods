import React, { lazy } from 'react'
import AppsIcon from '@material-ui/icons/Apps'
import HomeIcon from '@material-ui/icons/Home'
import PublicIcon from '@material-ui/icons/Public'
import GamesIcon from '@material-ui/icons/Games'
import InfoIcon from '@material-ui/icons/Info'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
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
const EmailVerification = lazy(() => import('./EmailVerification'))
const RegisterOrganization = lazy(() => import('./RegisterOrganization'))
const Paypal = lazy(() => import('./Paypal'))
const OurGoods = lazy(() => import('./OurGoods'))
const Inventory = lazy(() => import('./Inventory'))
const SelfieCam = lazy(() => import('./SelfieCam'))

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
    icon: <PublicIcon />,
    component: Organizations,
    path: '/organizations',
    exact: true
  },
  {
    path: '/organization/:id',
    component: Organization
  },
  {
    name: 'gGoods',
    icon: <AppsIcon />,
    component: Goods,
    path: '/goods',
    exact: true
  },
  {
    name: 'games',
    icon: <GamesIcon />,
    component: Games,
    path: '/games',
    exact: true
  },
  {
    name: 'Inventory',
    icon: <InsertEmoticonIcon />,
    component: Inventory,
    path: '/inventory',
    exact: true,
    roles: ['organization']
  },
  {
    name: 'your-collection',
    icon: <InsertEmoticonIcon />,
    component: YourCollection,
    path: '/your-collection',
    exact: true,
    roles: ['gamer', 'user']
  },
  {
    name: 'about',
    icon: <InfoIcon />,
    component: About,
    path: '/about',
    exact: true
  },
  {
    icon: <AppsIcon />,
    component: Paypal,
    path: '/paypal-integration',
    exact: true
  },
  {
    icon: <DashboardIcon />,
    component: CreateTemplate,
    path: '/create-template',
    exact: true
  },
  {
    icon: <DashboardIcon />,
    component: PutOnSale,
    path: '/put-on-sale',
    exact: true
  },
  {
    icon: <DashboardIcon />,
    component: OurGoods,
    path: '/our-goods',
    exact: true
  },
  {
    path: '/good/:id',
    component: GoodPage
  },
  {
    component: SelfieCam,
    path: '/games/selfie-cam',
    exact: true
  },
  {
    component: EmailVerification,
    path: '/verification/:code',
    exact: true
  },
  {
    component: RegisterOrganization,
    path: '/register-organization/:code',
    exact: true
  },
  {
    path: '/not-found',
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

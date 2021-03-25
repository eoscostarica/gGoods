import React, { lazy } from 'react'

import {
  Grid as GridIcon,
  Info as InfoIcon,
  HelpCircle as HelpIcon,
  GitMerge as GitMergeIcon,
  GitHub as GitHubIcon,
  Send as TelegramIcon
} from 'react-feather'

import { mainConfig } from '../config'

const Home = lazy(() => import('./Home'))
const CreateTemplate = lazy(() => import('./CreateTemplate'))
const About = lazy(() => import('./About'))
const Help = lazy(() => import('./Help'))
const Page404 = lazy(() => import('./Route404'))
const EmailVerification = lazy(() => import('./EmailVerification'))
const RegisterOrganization = lazy(() => import('./RegisterOrganization'))

const routes = [
  {
    name: 'home',
    icon: <GridIcon />,
    component: Home,
    path: '/',
    exact: true
  },
  {
    name: 'createTemplate',
    icon: <GridIcon />,
    component: CreateTemplate,
    path: '/create-template',
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
    name: 'help',
    icon: <HelpIcon />,
    component: Help,
    path: '/help',
    exact: true
  },
  {
    name: 'changelog',
    badge: mainConfig.appVersion,
    path: 'https://github.com/eoscostarica/full-stack-boilerplate/tags',
    icon: <GitMergeIcon />,
    exact: true
  },
  {
    header: 'community',
    name: 'github',
    path: 'https://github.com/eoscostarica/full-stack-boilerplate',
    icon: <GitHubIcon />
  },
  {
    name: 'telegram',
    path: 'https://t.me/blockchaincostarica',
    icon: <TelegramIcon />
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

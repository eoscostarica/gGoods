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
const About = lazy(() => import('./About'))
const Help = lazy(() => import('./Help'))
const Page404 = lazy(() => import('./Route404'))

const routes = [
  {
    name: 'home',
    icon: <GridIcon />,
    component: Home,
    path: '/',
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
    badge: mainConfig.appVersion || 'v1.0',
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
    component: Page404
  }
]

export default routes

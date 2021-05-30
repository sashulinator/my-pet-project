import './_main.less'

import React, { FC, memo } from 'react'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { useSelector } from 'react-redux'

import Header from '@/template/header/_header'
import Sider from '@/components/sider/_sider'

import ROUTES from '@/constant/routes'
import PERMISSIONS from '@/helper/permission'

import { CSSVariableState, RootState } from '@/type/state'

import NotFound from '@/page/notFound/_notFound'

import About from './tab.about/_tab.about'
import Search from './tab.search/_tab.search'
import Feedback from './tab.feedback/_tab.feedback'
import ParamsConfig from './tab.paramsConfig/_tab.paramsConfig'
import Mailing from './tab.mailing/_tab.mailing'
import Notification from './tab.notifications/_tab.notification'
import Users from './tab.users/_tab.users'

const MainPage: FC = (): JSX.Element => {
  const location = useLocation()

  const cssVariableState = useSelector((s: RootState): CSSVariableState => s.cssVariableState)

  const [, , smth] = location.pathname.split('/')
  const appPath = `/${smth}`

  return (
    <>
      <Header />
      <Sider />
      <main className="MainPage">
        <SwitchTransition>
          <CSSTransition key={appPath} timeout={cssVariableState.appPageSwitchAnimation} classNames="mainTab">
            <Switch location={location}>
              <Route path={ROUTES.NOTIFICATION.PATH} component={Notification} />
              {ROUTES.APP.isCurrent && <Redirect to={ROUTES.ABOUT.PATH} />}
              {PERMISSIONS.PERMISSION_DEALER_DATA.is && <Route path={ROUTES.ABOUT.PATH} component={About} />}
              <Route path={ROUTES.USER_LIST.PATH} component={Users} />
              {PERMISSIONS.PERMISSION_CLIENT_FEEDBACK.is && <Route path={ROUTES.FEEDBACK.PATH} component={Feedback} />}
              {PERMISSIONS.PERMISSION_MAILINGS && <Route path={ROUTES.MAILING.PATH} component={Mailing} />}
              {PERMISSIONS.PERMISSION_PARAMS_CONFIG.is && (
                <Route path={ROUTES.PARAMS_CONFIG_LIST.PATH} component={ParamsConfig} />
              )}
              {(PERMISSIONS.PERMISSION_DEALER_CARS.is || PERMISSIONS.PERMISSION_DEALER_CLIENTS.is) && (
                <Route path={ROUTES.SEARCH.PATH} component={Search} />
              )}
              <Route component={NotFound} />
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      </main>
    </>
  )
}

const x = memo(MainPage)
export default x

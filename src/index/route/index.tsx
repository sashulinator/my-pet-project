import React from 'react'

import { Route, useLocation, Router, Switch } from 'react-router-dom'

import { setPreviousRoute } from '@/util/route-constant'
import history from '@/index/route/history'
import ROUTES from '@/constant/routes'
import Main from '@/page/main/_main'
import Login from '@/page/login/_login'
import NotFound from '@/page/notFound/_notFound'

import ProtectedRoute from './protectedRoute'
import setPageTitle from './util.setPageTitle'

export default function RouterManager(): JSX.Element {
  return (
    <Router history={history}>
      <RouteList />
    </Router>
  )
}

const RouteList = () => {
  const location = useLocation()

  setPreviousRoute({ ...ROUTES })
  setPageTitle()

  return (
    <div className="ReactRouterDom withHeader">
      <Switch location={location}>
        <Route path={ROUTES.LOGIN.PATH} component={Login} />

        <ProtectedRoute path={ROUTES.APP.PATH} component={Main} />
        <NotFound />
      </Switch>
    </div>
  )
}

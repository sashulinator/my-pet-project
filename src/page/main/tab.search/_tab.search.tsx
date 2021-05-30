import './_tab.search.less'

import React, { FC, memo } from 'react'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

import ROUTES from '@/constant/routes'

import Header from './header'

import Car from './car/_car'
import CarList from './list.car/_list.car'
import ClientList from './list.client/_list.client'

const SearchTab: FC = (): JSX.Element => {
  const location = useLocation()

  const isCar = ROUTES.SEARCH_CAR.isCurrent
  const isCarPrevious = ROUTES.SEARCH_CAR.isPrevious
  const isClient = ROUTES.SEARCH_CLIENT.isCurrent

  const isCarActiveTab = isCar || (!isClient && isCarPrevious)

  ROUTES.SEARCH.REDIRECT = !isCarActiveTab ? ROUTES.SEARCH_CLIENT : ROUTES.SEARCH_CAR

  const locationAnimationKey = location.pathname.split('/').slice(0, 3).join('/')

  return (
    <div className="SearchTab">
      <SwitchTransition>
        <CSSTransition key={location.pathname} timeout={200} classNames="appear" unmountOnExit>
          <Switch location={location}>
            <Route exact path={ROUTES.SEARCH_CAR_CAR.PATH} component={Car} />
            <Route exact path={ROUTES.SEARCH_CLIENT_CAR.PATH} component={Car} />
          </Switch>
        </CSSTransition>
      </SwitchTransition>
      <div className="SearchContent scrollableContent scrollToTopOnRequest">
        <section className="title first">
          <Header isCarActiveTab={isCarActiveTab} />
        </section>
        <SwitchTransition>
          <CSSTransition
            key={locationAnimationKey}
            timeout={{ appear: 0, enter: 200, exit: 200 }}
            classNames="animSwitchHorizontal"
            unmountOnExit
          >
            <Switch location={location}>
              <Route path={ROUTES.SEARCH_CLIENT.PATH} component={ClientList} />
              <Route path={ROUTES.SEARCH_CAR.PATH} component={CarList} />
              <Redirect to={ROUTES.SEARCH_CLIENT.PATH} />
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

const x = memo(SearchTab)
export default x

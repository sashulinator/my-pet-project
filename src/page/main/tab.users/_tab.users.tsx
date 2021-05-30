import './_tab.users.less'

import React, { FC, memo } from 'react'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { Switch, Route, useLocation } from 'react-router-dom'

import ROUTES from '@/constant/routes'

import UserList from './list/_list'
import User from './user/_user'

const Users: FC = (): JSX.Element => {
  const location = useLocation()

  return (
    <div className="Users">
      <UserList />
      <SwitchTransition mode="in-out">
        <CSSTransition key={location.pathname} timeout={200} classNames="appear" unmountOnExit>
          <Switch location={location}>
            <Route path={ROUTES.USER.PATH} component={User} />
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

const x = memo(Users)
export default x

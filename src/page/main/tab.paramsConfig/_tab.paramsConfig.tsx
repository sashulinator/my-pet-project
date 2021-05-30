/* eslint-disable  import/no-named-as-default-member */
import './_tab.paramsConfig.less'

import React, { FC, memo } from 'react'

import { useDispatch } from 'react-redux'

import * as configTypeCatalog from '@/store/action/configTypeCatalog'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { Switch, Route, useLocation } from 'react-router-dom'

import ROUTES from '@/constant/routes'

import List from './list/_list'
import One from './one/_one'
import Apply from './apply'

const Users: FC = (): JSX.Element => {
  const location = useLocation()
  const dispatch = useDispatch()
  React.useEffect(() => getConfigTypeCatalog(), [])

  function getConfigTypeCatalog() {
    dispatch(configTypeCatalog.getList())
  }

  if (ROUTES.PARAMS_CONFIG_APPLY.isCurrent) {
    return (
      <Switch location={location}>
        <Route path={ROUTES.PARAMS_CONFIG_APPLY.PATH} component={Apply} />
      </Switch>
    )
  }

  return (
    <div className="Users">
      <List />
      <SwitchTransition mode="in-out">
        <CSSTransition key={location.pathname} timeout={200} classNames="appear" unmountOnExit>
          <Switch location={location}>
            <Route path={ROUTES.PARAMS_CONFIG_EDIT.PATH} component={One} />
            <Route path={ROUTES.PARAMS_CONFIG_CREATE.PATH} component={One} />
          </Switch>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

const x = memo(Users)
export default x

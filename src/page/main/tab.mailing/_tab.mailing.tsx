import React, { FC, memo } from 'react'

import cx from 'clsx'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import { Switch, Route, useLocation, useHistory, Link } from 'react-router-dom'

import ROUTES from '@/constant/routes'

import Template from './list.template/_list.template'
import History from './list.history/_list.history'
import CreateTemplate from './one/_one'

const MailingTab: FC = (): JSX.Element => {
  const location = useLocation()

  const history = useHistory()

  const isTemplate = new RegExp(ROUTES.MAILING_TEMPLATE_LIST.PATH, 'i').test(location.pathname)
  const isHistory = new RegExp(ROUTES.MAILING_HISTORY.PATH, 'i').test(location.pathname)

  ROUTES.MAILING.REDIRECT = isTemplate ? ROUTES.MAILING_TEMPLATE_LIST : ROUTES.MAILING_HISTORY

  redirectToTemplate()

  return (
    <div className="MailingTab wrap">
      <SwitchTransition>
        <CSSTransition key={location.pathname} timeout={200} classNames="appear" unmountOnExit>
          <Switch location={location}>
            <Route exact path={ROUTES.MAILING_TEMPLATE.PATH} component={CreateTemplate} />
            <Route exact path={ROUTES.MAILING_TEMPLATE_CREATE.PATH} component={CreateTemplate} />
          </Switch>
        </CSSTransition>
      </SwitchTransition>
      <div className="MailingContent scrollableContent scrollToTopOnRequest">
        <section className="first">
          <h1 className="nowrap">
            <Link
              to={ROUTES.MAILING_TEMPLATE_LIST.REDIRECT_PATH}
              className={cx('margin-right-l', !isHistory ? 'primary' : 'default')}
            >
              Шаблоны
            </Link>
            <Link to={ROUTES.MAILING_HISTORY.REDIRECT_PATH} className={cx(isHistory ? 'primary' : 'default')}>
              История
            </Link>
          </h1>
        </section>
        <SwitchTransition>
          <CSSTransition
            key={String(isTemplate)}
            timeout={{ appear: 0, enter: 200, exit: 200 }}
            classNames="animSwitchHorizontal"
            unmountOnExit
          >
            <Switch location={location}>
              <Route path={ROUTES.MAILING_TEMPLATE_LIST.PATH} component={Template} />
              <Route path={ROUTES.MAILING_HISTORY.PATH} component={History} />
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )

  function redirectToTemplate() {
    if (!isHistory && !isTemplate) {
      history.push(ROUTES.MAILING_TEMPLATE_LIST.PATH)
    }
  }
}

const x = memo(MailingTab)
export default x

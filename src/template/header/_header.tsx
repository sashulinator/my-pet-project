import './_header.less'

import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'clsx'
import { getListForEveryLocation } from '@/util/route-constant'

import Breadcrumbs from '@/components/breadcrumbs/_breadcrumbs'
import { UserState, RootState } from '@/type/state'

import ROUTES from '@/constant/routes'

import * as userActions from '@/store/action/user'

import Notification from '@/template/notification/_notification'

const Header: FC = (): JSX.Element => {
  const dsp = useDispatch()

  const userState = useSelector((s: RootState): UserState => s.userState)

  useEffect(getCurrentUser, [])

  return (
    <header className="Header">
      <div className="headerContainer">
        <div className="left f">
          <div className="logoWrapper f-center-center" />
        </div>
        <div className="breadcrumbsWrapper f-left-center">
          <Breadcrumbs routes={getListForEveryLocation({ ...ROUTES })} />
        </div>
        <div className="right tall">
          {userState.entity ? (
            <Link className={cx('tall nowrap', ROUTES.ABOUT.isCurrent && 'primaryBg')} to={ROUTES.ABOUT.PATH}>
              {buildName()}
            </Link>
          ) : null}
          <Notification />
          <Link className="tall" to={ROUTES.LOGIN.PATH} onClick={logout}>
            Выйти
          </Link>
        </div>
      </div>
    </header>
  )

  function buildName() {
    if (!userState?.entity?.lastName) return null

    return `${userState.entity.lastName} ${userState.entity.firstName[0]}.${userState.entity.middleName[0]}.`
  }

  function getCurrentUser() {
    if (!userState.entity) {
      dsp(userActions.getCurrent())
    }
  }

  function logout() {
    localStorage.clear()

    dsp({
      type: 'RESET_ALL',
    })
  }
}

export default Header

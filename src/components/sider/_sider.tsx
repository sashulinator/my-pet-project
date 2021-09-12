/* eslint-disable jsx-a11y/anchor-is-valid */
import './_sider.less'

import React, { FC, memo, useMemo, useRef } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import c from 'clsx'

import { CSSTransition, SwitchTransition } from 'react-transition-group'

import Route from '@savchenko91/rc-route-constant'

import ArrowIcon from '@/components/svg/arrowFilledIcon'

import { ROUTES, Payload } from '@/constant/routes'

// import siderBottomImg from '@/img/svg/sider-bottom.svg'

import IconInCircle from '@/components/IconInCircle/_iconInCircle'
import PERMISSIONS from '@/helper/permission'
import useSetCSSVariable from '@/hook/useSetCSSVariable'
import useCarousel from '@/hook/useCarousel/useCarousel'

import PopupLicense from '@/template/popupLicense/_popupLicense'
import ThemeSetter from '@/template/themeSetter/themeSetter'

import * as cssVariableActions from '@/store/action/cssVariable'

import { RootState } from '@/type/state'

const AppSider: FC = (): JSX.Element => {
  const dsp = useDispatch()

  const location = useLocation()

  const menu = useMemo(() => {
    const memoMenu: Route<string, Payload>[] = []
    // if (PERMISSIONS.PERMISSION_DEALER_CARS.is || PERMISSIONS.PERMISSION_DEALER_CLIENTS.is) {
    //   memoMenu.push(ROUTES.SEARCH)
    // }
    // if (PERMISSIONS.PERMISSION_CLIENT_FEEDBACK.is) {
    //   memoMenu.push(ROUTES.FEEDBACK)
    // }
    // if (PERMISSIONS.PERMISSION_PARAMS_CONFIG.is) {
    //   memoMenu.push(ROUTES.PARAMS_CONFIG_LIST)
    // }
    // if (PERMISSIONS.PERMISSION_MAILINGS.is) {
    //   memoMenu.push(ROUTES.MAILING)
    // }
    if (PERMISSIONS.PERMISSION_MANAGEMENT.is) {
      memoMenu.push(ROUTES.USER_LIST)
    }

    return memoMenu
  }, [])

  const togglePopupLicense = useRef<(b: boolean) => void | undefined>()

  const { cssVariableState } = useSelector((s: RootState): RootState => s)

  const carousel = useCarousel({ slideAmount: menu.length, setVariable: changeSelectorPosition })

  const [siderRef, setSiderCSSVariable] = useSetCSSVariable({ prefix: 'sider-' })

  carousel.setActiveSlide(-1, 200)

  return (
    <div className={c('Sider', cssVariableState.isSiderCollapsed && 'Sider--collapsed')} ref={siderRef}>
      <div className="menu hideScroll">
        <PopupLicense setStateRef={togglePopupLicense} />
        <ol className="linkList">
          <div className="selector" />
          {menu.map((menuItem, i) => {
            const active = menuItem.isPartOf(location.pathname)

            if (active) carousel.setActiveSlide(i, 200)

            return (
              <Link
                to={menuItem.REDIRECT_PATH}
                className={c(active && 'active', menuItem.PAYLOAD.LABEL)}
                key={menuItem.REDIRECT_PATH}
              >
                <li className="f-left-center">
                  <div className="collapseContent relative">
                    <IconInCircle className="absolute-centered">{menuItem.PAYLOAD.ICON}</IconInCircle>
                  </div>
                  <SwitchTransition>
                    <CSSTransition
                      key={cssVariableState.isSiderCollapsed.toString()}
                      timeout={200}
                      classNames="appear"
                      unmountOnExit
                    >
                      {!cssVariableState.isSiderCollapsed ? <span className="menuLabel">{menuItem.NAME}</span> : <></>}
                    </CSSTransition>
                  </SwitchTransition>
                </li>
              </Link>
            )
          })}
        </ol>
        <ol>
          <a style={{ cursor: 'pointer' }} onClick={setCollapsedHandler}>
            <li className="collapseButton f-center-center">
              <SwitchTransition>
                <CSSTransition
                  key={cssVariableState.isSiderCollapsed.toString()}
                  timeout={200}
                  classNames="appear"
                  unmountOnExit
                >
                  {cssVariableState.isSiderCollapsed ? (
                    <ArrowIcon />
                  ) : (
                    <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
                  )}
                </CSSTransition>
              </SwitchTransition>
            </li>
          </a>
        </ol>
      </div>
      <div className="siderBottom">
        {/* <img src={siderBottomImg} className="bottomImg" alt="am i beautiful?" /> */}
        <SwitchTransition>
          <CSSTransition
            key={cssVariableState.isSiderCollapsed.toString()}
            timeout={200}
            classNames="appear"
            unmountOnExit
          >
            {!cssVariableState.isSiderCollapsed ? (
              <div className="fc">
                <div>
                  <a
                    className="privacyPolicy"
                    style={{ cursor: 'pointer' }}
                    onClick={() => togglePopupLicense.current?.(true)}
                  >
                    Политика конфиденциальности
                  </a>
                </div>
                <ThemeSetter />
              </div>
            ) : (
              <></>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )

  function changeSelectorPosition(key: string, value: number) {
    setSiderCSSVariable(`selector-${key}`, value)
  }

  function setCollapsedHandler(): void {
    const isSiderCollapsed = !cssVariableState.isSiderCollapsed

    localStorage.setItem('isSiderCollapsed', isSiderCollapsed.toString())

    dsp(cssVariableActions.set({ isSiderCollapsed }))
  }
}

const x = memo(AppSider)
export default x

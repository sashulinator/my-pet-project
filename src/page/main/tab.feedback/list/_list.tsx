import './_list.less'

import React, { FC, useEffect, memo, useState } from 'react'

import c from 'clsx'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import ROUTES from '@/constant/routes'

// import useDelayRender from '@/hook/useDelayRender'

import * as userActions from '@/store/action/ticket'

import { PaginationSection } from '@/template/paginationSection'

import { CSSVariableState, RootState, UserState } from '@/type/state.d'

import { useListManager } from '@/util/listManager'

type FeedbackListProps = {
  isCurrent?: boolean
}

const FeedbackList: FC<FeedbackListProps> = (): JSX.Element | null => {
  const userState = useSelector((s: RootState): UserState => s.userState)
  const cssVariableState = useSelector((s: RootState): CSSVariableState => s.cssVariableState)

  const [renderDelay, setRenderDelay] = useState(cssVariableState.appPageSwitchAnimation)

  const { list } = userState

  const listManager = useListManager({
    route: ROUTES.MAILING_TEMPLATE_LIST,
    actions: userActions,
    state: userState,
  })

  useEffect(getTicketList, [])

  useEffect(delayRender, [])

  return (
    <div className={c('FeedbackList', 'scrollableContent', 'wrap', userState.loading.getList && 'loading')}>
      <section className="titleWithButton first">
        <h1>Обратная связь</h1>
      </section>
      {!renderDelay && (
        <>
          <PaginationSection paginationProps={listManager.paginationProps} list={list} />

          <section className="appear last">
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <Link className="fs24" to={ROUTES.FEEDBACK_DIALOG.PATH}>
                dialog
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  )

  function delayRender() {
    setRenderDelay(0)
  }

  function getTicketList() {
    if (!list.length) {
      listManager.dispatchAction()
    }
  }
}

const x = memo(FeedbackList)
export default x

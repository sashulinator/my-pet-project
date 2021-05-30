import './_list.less'

import React, { FC, useEffect, memo } from 'react'

import c from 'clsx'

import { useSelector } from 'react-redux'

import ROUTES from '@/constant/routes'
import Table from '@/components/table'

import useDelayRender from '@/hook/delayRender'

import * as notificationActions from '@/store/action/notification'

import { PaginationSection } from '@/template/paginationSection'

import { RootState } from '@/type/state'

import { useListManager } from '@/util/listManager'

import columns from './columns'
import Filter from './filter'

const NotificationList: FC = (): JSX.Element | null => {
  const renderDelay = useDelayRender()

  const { notificationState } = useSelector((s: RootState): RootState => s)
  const { list } = notificationState

  const listManager = useListManager({
    route: ROUTES.USER_LIST,
    actions: notificationActions,
    state: notificationState,
  })

  useEffect(() => getNotificationList(), [])

  return (
    <div className={c('NotificationList', 'scrollableContent', notificationState.loading.getList && 'loading')}>
      <section className="titleWithButton first">
        <h1>Оповещения</h1>
      </section>
      <section className="first margin-bottom-l f-left-center">
        <Filter listManager={listManager} />
      </section>
      {!renderDelay && (
        <>
          <PaginationSection paginationProps={listManager.paginationProps} list={list} />
          <section className="appear last">
            <Table columns={columns} data={list} loading={notificationState.loading.getList} name="template" />
          </section>
        </>
      )}
    </div>
  )

  function getNotificationList() {
    if (!list.length) {
      listManager.dispatchAction()
    }
  }
}

const x = memo(NotificationList)
export default x

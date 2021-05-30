import './_list.less'

import React, { FC, useEffect, memo } from 'react'

import c from 'clsx'

import { useSelector } from 'react-redux'

import ROUTES from '@/constant/routes'
import Table from '@/components/table'

import useDelayRender from '@/hook/delayRender'

import * as userActions from '@/store/action/user'

import { PaginationSection } from '@/template/paginationSection'

import { RootState } from '@/type/state'

import { useListManager } from '@/util/listManager'

import columns from './columns'

const UserList: FC = (): JSX.Element | null => {
  const renderDelay = useDelayRender()

  const { userState } = useSelector((s: RootState): RootState => s)
  const { list } = userState

  const listManager = useListManager({
    route: ROUTES.USER_LIST,
    actions: userActions,
    state: userState,
  })

  useEffect(getUserList, [])

  return (
    <div className={c('UserList', 'scrollableContent', userState.loading.getList && 'loading')}>
      <section className="titleWithButton first">
        <h1>Пользователи</h1>
      </section>
      {!renderDelay && (
        <>
          <PaginationSection paginationProps={listManager.paginationProps} list={list} />
          <section className="appear last">
            <Table columns={columns} data={list} loading={userState.loading.getList} name="template" />
          </section>
        </>
      )}
    </div>
  )

  function getUserList() {
    if (!list.length) {
      listManager.dispatchAction()
    }
  }
}

const x = memo(UserList)
export default x

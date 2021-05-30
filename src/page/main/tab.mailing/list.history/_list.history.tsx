import './_list.history.less'

import React, { FC, memo } from 'react'

import { useSelector } from 'react-redux'

import cx from 'clsx'

import ROUTES from '@/constant/routes'

// import useDelayRender from '@/hook/useDelayRender'
import Table from '@/components/table'

import * as MailingHistoryActions from '@/store/action/mailingHistory'

import { PaginationSection } from '@/template/paginationSection'

import { useListManager } from '@/util/listManager'

import { RootState } from '@/type/state'

import columns from './columns'

import Filter from './filter'

const MailingHistory: FC = (): JSX.Element | null => {
  const { mailingHistoryState } = useSelector((s: RootState): RootState => s)
  const { list } = mailingHistoryState

  const listManager = useListManager({
    route: ROUTES.MAILING_TEMPLATE_LIST,
    actions: MailingHistoryActions,
    state: mailingHistoryState,
  })

  // useEffect(() => getTemplateList(), [])

  return (
    <div className={cx('MailingHistory animSwitchFromLeft appear', listManager.isLoading && 'loading')}>
      <section className="first margin-bottom-l f-spaceBetween-center">
        <Filter onSubmit={listManager.onFilterChange} initialValues={listManager.state.filter} />
      </section>
      <PaginationSection paginationProps={listManager.paginationProps} list={list} />
      <section className="last appear">
        <div>
          <Table columns={columns} data={list} loading={mailingHistoryState.loading.getList} name="template" />
        </div>
      </section>
    </div>
  )

  // function getTemplateList() {
  //   if (!list.length) {
  //     listManager.dispatchAction()
  //   }
  // }
}

const x = memo(MailingHistory)
export default x

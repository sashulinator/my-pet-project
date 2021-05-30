import './_list.template.less'

import React, { FC, useEffect, memo } from 'react'

import { useSelector } from 'react-redux'

import cx from 'clsx'

import Button from '@/components/button'
import Table from '@/components/table'

import ROUTES from '@/constant/routes'

import useDelayRender from '@/hook/delayRender'

import * as mailingTemplateActions from '@/store/action/mailingTemplate'

import { PaginationSection } from '@/template/paginationSection'

import { useListManager } from '@/util/listManager'

import { RootState } from '@/type/state'

import columns from './columns'

import Filter from './filter'

const MailingTemplate: FC = (): JSX.Element | null => {
  const renderDelay = useDelayRender()

  const { mailingTemplateState } = useSelector((s: RootState): RootState => s)
  const { list } = mailingTemplateState

  const listManager = useListManager({
    route: ROUTES.MAILING_TEMPLATE_LIST,
    actions: mailingTemplateActions,
    state: mailingTemplateState,
  })

  useEffect(() => getTemplateList(), [])

  return (
    <div className={cx('MailingTemplateList animSwitchFromRight appear', listManager.isLoading && 'loading')}>
      <section className="first margin-bottom-l f-spaceBetween-center">
        <Filter onSubmit={listManager.onFilterChange} initialValues={listManager.state.filter} />
        <Button href={ROUTES.MAILING_TEMPLATE_CREATE.PATH} className="fs18">
          Добавить
        </Button>
      </section>
      {!renderDelay && (
        <>
          <PaginationSection paginationProps={listManager.paginationProps} list={list} />
          <section className="last appear">
            <Table columns={columns} data={list} loading={mailingTemplateState.loading.getList} name="template" />
          </section>
        </>
      )}
    </div>
  )

  function getTemplateList() {
    if (!list.length) {
      listManager.dispatchAction()
    }
  }
}

const x = memo(MailingTemplate)
export default x

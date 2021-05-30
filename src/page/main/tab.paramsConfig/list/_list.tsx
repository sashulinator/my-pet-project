import React, { FC, useEffect, memo } from 'react'

import { useSelector } from 'react-redux'

import cx from 'clsx'

import ROUTES from '@/constant/routes'

import Table from '@/components/table'

import useDelayRender from '@/hook/delayRender'

import * as paramsConfigActions from '@/store/action/paramsConfig'

import { PaginationSection } from '@/template/paginationSection'

import { useListManager } from '@/util/listManager'

import { RootState } from '@/type/state'

import columns from './columns'

import Filter from './filter'

const ParamsConfigList: FC = (): JSX.Element | null => {
  const { paramsConfigState } = useSelector((s: RootState): RootState => s)
  const { list } = paramsConfigState

  const renderDelay = useDelayRender()

  const listManager = useListManager({
    route: ROUTES.PARAMS_CONFIG_LIST,
    actions: paramsConfigActions,
    state: paramsConfigState,
  })

  useEffect(() => getTemplateList(), [])

  return (
    <div
      className={cx(
        'ParamsConfigList animSwitchFromLeft scrollableContent scrollToTopOnRequest',
        listManager.isLoading && 'loading',
      )}
    >
      <section className="titleWithButton first">
        <h1>События</h1>
      </section>
      <section className="first margin-bottom-l f-left-center">
        <Filter onSubmit={listManager.onFilterChange} initialValues={listManager.state.filter} />
      </section>
      {!renderDelay && (
        <>
          <PaginationSection paginationProps={listManager.paginationProps} list={list} />
          <section className="last appear">
            <Table columns={columns} data={list} loading={paramsConfigState.loading.getList} name="template" />
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

const x = memo(ParamsConfigList)
export default x

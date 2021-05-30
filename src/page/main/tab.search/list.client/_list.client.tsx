import './_list.client.less'

import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Collapse from 'rc-collapse'
import { useLocation } from 'react-router'
import { isEmpty, isEqual } from 'lodash'
import cx from 'clsx'

import { SklList } from '@/components/skelet/_skelet'
import SettingsIcon from '@/components/svg/settingsFilledIcon'

import ROUTES from '@/constant/routes'

import motion, { delayListItem } from '@/helper/animation'

import delayRender from '@/hook/delayRender'

import * as clientActions from '@/store/action/customers'

import Empty from '@/template/empty/_empty'
import FilterHeader from '@/template/collapseHeader/_collapseHeader'
import { PaginationSection } from '@/template/paginationSection'

import { ClientState, RootState } from '@/type/state'
import { ClientModel } from '@/type/model'

import { useListManager } from '@/util/listManager'

import PopupSendMessage from '../popup.sendMessage'

import Filter from './filter'

import ListItem from './listItem'

const { Panel } = Collapse

const SearchClientList: FC = (): JSX.Element => {
  const dsp = useDispatch()

  const setModalOpenRef = useRef(undefined)

  const renderDelay = delayRender()

  const location = useLocation()

  const clientState = useSelector((s: RootState): ClientState => s.clientState)
  const { list, checkList } = clientState

  const str = 'client'

  const listManager = useListManager({
    onStage: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: ({ body }: any) => body.content.length && changeCollapseActiveKey([]),
    },
    route: ROUTES.SEARCH_CLIENT,
    actions: clientActions,
    state: clientState,
  })

  const [checkBoxesOnAnotherPageList, setCheckBoxesOnAnotherPageList] = useState<ClientModel[]>([])

  useEffect(checkCheckBoxesAtAnotherPage, [checkList, list])
  useEffect(getClientList, [location.search])

  return (
    <div className={cx('SearchClientList animSwitchFromRight', listManager.isLoading && 'loading')}>
      <PopupSendMessage setStateRef={setModalOpenRef} />
      <section className="margin-bottom-l">
        <Collapse
          className="filterCollapse"
          onChange={() => changeCollapseActiveKey()}
          activeKey={clientState.filterCollapseActiveKeys}
          defaultActiveKey="main"
          openMotion={motion}
        >
          <Panel
            key="main"
            header={<FilterHeader title="Раскрыть фильтр" className="primary fs30" icon={<SettingsIcon />} />}
            headerClass="filterCollapseHeader"
          >
            <Filter
              onSubmit={listManager.onFilterChange}
              initialValues={listManager.state.filter}
              listManager={listManager}
            />
          </Panel>
        </Collapse>
      </section>
      <PaginationSection
        paginationProps={listManager.paginationProps}
        list={list}
        checkList={checkList}
        checkAll={checkAll}
        loading={listManager.isLoading}
        setIsModalOpen={setModalOpenRef.current}
        typeOfParent={str}
      />
      {!renderDelay && ROUTES.SEARCH_CLIENT.isPartOf(window.location.pathname) && (
        <section className="last">
          {listManager.isEmpty ? (
            <Empty />
          ) : (
            <>
              {(listManager.initial.request || listManager.initial.list) &&
                SklList(list, clientState.loading.getList, 'clientList').map((iClient, i) => {
                  return (
                    <ListItem
                      key={iClient.id || i}
                      clientState={clientState}
                      Client={iClient}
                      className={cx(
                        `aDelay${delayListItem(i + 2, list.length)}00ms`,
                        // (!isPreviousRelatedPage || initial.current.request) && ClientList.length && 'appearRight',
                      )}
                    />
                  )
                })}
            </>
          )}
        </section>
      )}
    </div>
  )

  function getClientList() {
    const { parsedSearch } = listManager

    if (isEmpty(parsedSearch)) return

    if (!isEqual(parsedSearch, listManager.state.filter)) {
      listManager.dispatchAction()
    }
  }

  function checkCheckBoxesAtAnotherPage(): void {
    const listElems = list.map((elem: ClientModel) => elem.id)

    const checkListElems = checkList?.map((item: ClientModel) => item.id)

    const arr: ClientModel[] = []

    for (let i = 0; i < checkListElems.length; i += 1) {
      if (!listElems?.includes(checkListElems[i])) {
        arr.push(checkList[i])
      }
    }
    setCheckBoxesOnAnotherPageList(arr)
  }

  function checkAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      let result = []
      if (checkList.length === 0) result = list
      else result = [...list, ...checkBoxesOnAnotherPageList]
      dsp(clientActions.set({ checkList: result }))
    } else if (checkBoxesOnAnotherPageList.length === 0) {
      dsp(clientActions.set({ checkList: [] }))
    } else {
      dsp(clientActions.set({ checkList: checkBoxesOnAnotherPageList }))
    }
  }

  function changeCollapseActiveKey(value?: React.Key[]) {
    dsp(
      clientActions.set({
        filterCollapseActiveKeys: value || clientState.filterCollapseActiveKeys.includes('main') ? [] : ['main'],
      }),
    )
  }
}

export default SearchClientList

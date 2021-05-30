import './_list.car.less'

import React, { FC, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import Collapse from 'rc-collapse'

import cx from 'clsx'

import { isEmpty, isEqual } from 'lodash'

import { useLocation } from 'react-router'

// import { skeletonArray } from '@/components/skeleton/_skeleton'
import SettingsIcon from '@/components/svg/settingsFilledIcon'

import ROUTES from '@/constant/routes'
// import { clientSkeleton } from '@/constant/skeleton'

import motion, { delayListItem } from '@/helper/animation'

import * as carActions from '@/store/action/car'

import FilterHeader from '@/template/collapseHeader/_collapseHeader'
import { PaginationSection } from '@/template/paginationSection'
import Empty from '@/template/empty/_empty'

import { CarState, RootState } from '@/type/state'
import { CarModel } from '@/type/model'

import { useListManager } from '@/util/listManager'

import PopupSendMessage from '../popup.sendMessage'

import Filter from './filter'

import ListItem from './card'

const { Panel } = Collapse

type CarProps = {
  text?: 'string'
}

const SearchCarList: FC<CarProps> = (): JSX.Element => {
  const dsp = useDispatch()

  const location = useLocation()

  const setPopupSendMessageOpenRef = useRef(undefined)

  const carState = useSelector((s: RootState): CarState => s.carState)
  const { list, checkList } = carState

  const listManager = useListManager({
    onStage: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: ({ body }: any) => body.content.length && changeCollapseActiveKey([]),
    },
    route: ROUTES.SEARCH_CAR,
    actions: carActions,
    state: carState,
  })

  const [checkBoxesOnAnotherPageList, setCheckBoxesOnAnotherPageList] = useState<CarModel[]>([])

  useEffect(checkCheckBoxesAtAnotherPage, [checkList, list])
  useEffect(getCarList, [location.search])

  function checkCheckBoxesAtAnotherPage(): void {
    const listElems = list.map((elem: CarModel) => elem.uuid)
    const checkListElems = checkList.map((item: CarModel) => item.uuid)
    const arr: CarModel[] = []

    for (let i = 0; i < checkListElems.length; i += 1) {
      if (!listElems.includes(checkListElems[i])) {
        arr.push(checkList[i])
      }
    }
    setCheckBoxesOnAnotherPageList(arr)
  }
  return (
    <div className={cx('SearchCarList animSwitchFromLeft', listManager.isLoading && 'loading')}>
      <PopupSendMessage setStateRef={setPopupSendMessageOpenRef} />
      <section className="margin-bottom-l">
        <Collapse
          className="filterCollapse"
          onChange={() => changeCollapseActiveKey()}
          activeKey={carState.filterCollapseActiveKeys}
          defaultActiveKey="main"
          openMotion={motion}
        >
          <Panel
            key="main"
            header={<FilterHeader title="Раскрыть фильтр" className="primary fs30" icon={<SettingsIcon />} />}
            headerClass="filterCollapseHeader"
          >
            <Filter
              listManager={listManager}
              onSubmit={listManager.onFilterChange}
              initialValues={listManager.state.filter}
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
        setIsModalOpen={setPopupSendMessageOpenRef.current}
      />
      <section className="last">
        {listManager.isEmpty ? (
          <Empty />
        ) : (
          list.map((iCar, i) => {
            return (
              <ListItem
                key={iCar.uuid}
                entity={iCar}
                carState={carState}
                className={cx(`aDelay${delayListItem(i + 2, list.length)}00ms`)}
              />
            )
          })
        )}
      </section>
    </div>
  )

  function getCarList() {
    const { parsedSearch } = listManager

    if (isEmpty(parsedSearch)) return

    if (!isEqual(parsedSearch, listManager.state.filter)) {
      listManager.dispatchAction()
    }
  }

  function checkAll(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      let result = []
      if (checkList.length === 0) result = list
      else result = [...list, ...checkBoxesOnAnotherPageList]
      dsp(carActions.set({ checkList: result }))
    } else if (checkBoxesOnAnotherPageList.length === 0) {
      dsp(carActions.set({ checkList: [] }))
    } else {
      dsp(carActions.set({ checkList: checkBoxesOnAnotherPageList }))
    }
  }

  function changeCollapseActiveKey(value?: React.Key[]) {
    dsp(
      carActions.set({
        filterCollapseActiveKeys: value || carState.filterCollapseActiveKeys.includes('main') ? [] : ['main'],
      }),
    )
  }
}

export default SearchCarList

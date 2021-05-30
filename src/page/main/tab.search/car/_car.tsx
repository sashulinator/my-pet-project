import './_car.less'

import React, { FC, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import Collapse from 'rc-collapse'

import PostMessageIcon from '@/components/svg/postMessageIcon'
import Button from '@/components/button'

import motion from '@/helper/animation'

import * as carActions from '@/store/action/car'
// import * as telematicRecordActions from '@/store/action/telematicRecord'
import Empty from '@/template/empty/_empty'

import FilterHeader from '@/template/collapseHeader/_collapseHeader'

import { CarState, RootState } from '@/type/state.d'

import TelematicRecordContent from './panelContent.telematicRecord'
import MainInfoContent from './panelContent.mainInfo'
import ParametersContent from './panelContent.parameters'

import PopupSendMessage from '../popup.sendMessage'

const { Panel } = Collapse

const SearchCar: FC = (): JSX.Element => {
  const dsp = useDispatch()

  const { uuid } = useParams<{ uuid: string }>()

  const setPopupSendMessageOpenRef = useRef<undefined | ((v: boolean) => void)>(undefined)

  const carState = useSelector((s: RootState): CarState => s.carState)
  const { entity: Car, Card } = carState

  useEffect(() => getCar(), [])
  useEffect(() => getTelematicRecord(), [])

  return (
    <div>
      <div className="SearchCar scrollableContent wrap">
        <PopupSendMessage setStateRef={setPopupSendMessageOpenRef} />
        <section className="first">
          <h1>
            <div className="f-spaceBetween">
              {Car ? `${Car.brand} ${Car.model} ${Car?.carParameter?.issueYear || ''}` : 'Транспортное средство'}
            </div>
          </h1>
          <div className="f-spaceBetween">
            <div className="fs18">
              Владелец:&nbsp;
              {Car?.customers[0].legalEntity}
            </div>
            <Button>
              <PostMessageIcon onClick={() => setPopupSendMessageOpenRef?.current?.(true)} />
            </Button>
          </div>
        </section>

        {carState?.loading?.get || carState?.loading?.getCard ? (
          <section className="fs22">Загрузка ...</section>
        ) : (
          <>
            <section className="last">
              {Car ? (
                <>
                  <Collapse
                    className="ClientListItem"
                    openMotion={motion}
                    defaultActiveKey={['parametersRecord', 'telematicRecord', 'parametersRecord']}
                  >
                    <Panel
                      className="margin-bottom"
                      header={<FilterHeader title="Общая информация" className="fs30" />}
                      key="mainInfo"
                    >
                      <MainInfoContent Car={Car} TelematicRecord={Card} />
                    </Panel>

                    <Panel
                      className="margin-bottom"
                      header={<FilterHeader title="Сигнализаторы состояния" className="fs30" />}
                      key="telematicRecord"
                    >
                      <TelematicRecordContent TelematicRecord={Card} Car={Car} />
                    </Panel>

                    <Panel
                      className="margin-bottom"
                      header={<FilterHeader title="Параметры" className="fs30" />}
                      key="parametersRecord"
                    >
                      <ParametersContent TelematicRecord={Card} Car={Car} />
                    </Panel>
                  </Collapse>
                </>
              ) : (
                <Empty />
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )

  function getCar() {
    if (!Car && uuid) {
      dsp(carActions.get(uuid))
    }
  }

  function getTelematicRecord() {
    if (uuid) {
      dsp(carActions.getCard(uuid))
    }
  }
}

export default SearchCar

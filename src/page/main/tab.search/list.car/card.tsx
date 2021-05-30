/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */

import React, { FC } from 'react'

import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

import c from 'clsx'

import ROUTES from '@/constant/routes'
import { MALFUNCTIONS } from '@/constant/lastTelemetry'
import CheckboxButton from '@/components/checkboxButton'

import * as carActions from '@/store/action/car'

import { CarModel } from '@/type/model'
import { CarState } from '@/type/state'

import minibusSrc from '@/img/minibus.jpg'

import { buildCarTitle } from '../util'

type CarListItemProps = {
  entity: CarModel
  carState: CarState
  className: string
}

const CarListItem: FC<CarListItemProps> = ({ entity, carState, className }): JSX.Element => {
  const dsp = useDispatch()

  const { odometer, ...malfunction } = entity?.lastTelemetry || {}

  const isMalfunction = Boolean(Object.entries(malfunction).filter(([, v]) => !!v).length)

  return (
    <div className={c(className, 'CarListItem relative f-top-left')}>
      <Link to={ROUTES.SEARCH_CAR_CAR.PATH.replace(':uuid', entity.uuid)} onClick={setCar}>
        <img src={minibusSrc} alt="#" className="margin-right" />
      </Link>
      <div className="description fc wide">
        <div className="bold fs34 wide margin-bottom-s">{buildCarTitle(entity)}</div>
        <div className="f">
          <div className="mainInfo">
            <div className="CardInfoLink" onClick={setCar}>
              {[
                { label: 'Гос. номер', value: entity?.carParameter?.stateNumber || '—' },
                { label: 'VIN', value: entity.vin || '—' },
                { label: 'Клиент', value: entity.customers[0].legalEntity || '—' },
                { label: 'Рекомендации для дилера', value: 'нет' },
              ].map((item) => (
                <div className="margin-top-s" key={item.label}>
                  <div className="fs16 colorDim margin-bottom-xs nowrap">{item.label}:</div>
                  <div className="fs20">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="additionalInfo fc-center-center wide">
            <div>
              <p className="fs18 margin-bottom">
                Пробег: &nbsp;
                <span className="bold">{odometer || '-'}</span>
                &nbsp; {odometer ? 'км' : ''}
              </p>
              <div className={c(`fs14 margin-bottom`, isMalfunction && 'primary')}>
                {isMalfunction ? (
                  <>
                    {Object.entries(malfunction)
                      .filter(([, v]) => v)
                      .map(([key]) => (
                        <p>
                          {MALFUNCTIONS[key as keyof typeof MALFUNCTIONS]?.short}
                          <br />
                        </p>
                      ))}
                  </>
                ) : (
                  <>
                    нет активных сигнализаторов
                    <br />
                    неисправностей
                  </>
                )}
              </div>
              <p>
                <Link
                  to={ROUTES.SEARCH_CAR_CAR.PATH.replace(':uuid', entity.uuid)}
                  className="fs18 underline"
                  onClick={setCar}
                >
                  Подробнее
                </Link>
              </p>
            </div>
          </div>
          <CheckboxButton
            onChange={checkCar}
            className="checkbox absolute-right-center margin-right-s"
            checked={Boolean(carState.checkList.find((ic) => ic.uuid === entity.uuid))}
          />
        </div>
      </div>
    </div>
  )

  function setCar() {
    dsp(carActions.set({ entity }))
  }

  function checkCar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      dsp(carActions.set({ checkList: [...carState.checkList, entity] }))
    } else {
      dsp(carActions.set({ checkList: carState.checkList.filter((ic) => ic.uuid !== entity.uuid) }))
    }
  }
}

export default CarListItem

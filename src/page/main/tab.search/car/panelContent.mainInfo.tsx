/* eslint-disable react/no-array-index-key */

import React, { FC } from 'react'

import { CarCardModel } from '@/type/model'
import { CarState } from '@/type/state'

type MainInfoPanelContentProps = {
  Car: CarState['entity']
  TelematicRecord: CarCardModel | null
}

const MainInfoPanelContent: FC<MainInfoPanelContentProps> = ({ Car, TelematicRecord }): JSX.Element | null => {
  if (!TelematicRecord) return null

  const mainInfoList = [
    {
      key: 'Год выпуска',
      value: Car?.carParameter?.issueYear || '—',
    },
    {
      key: 'VIN',
      value: Car?.vin || '—',
    },
    {
      key: 'Гос. номер',
      value: Car?.carParameter.stateNumber || '—',
    },
    {
      key: 'Пробег автомобиля по одометру, км (CAN)',
      value: TelematicRecord?.odometer,
    },
    {
      key: (
        <>
          Остаток пробега
          <br />
          до очередного ТО, км (CAN)
        </>
      ),
      value: TelematicRecord.remainingMileage || '—',
    },
    {
      key: 'Показания одометра, км',
      value: TelematicRecord.odometer || '—',
    },
    {
      key: 'Общий расход топлива, л (CAN)',
      value: TelematicRecord.fuelConsumption || '—',
    },

    {
      key: 'Температура охлаждающей жидкости ºС',
      value: TelematicRecord?.coolantTemp,
    },
  ]

  return (
    <ul className="mainInfoContainer fs18">
      {mainInfoList.map((iMainInfo, i) => {
        return (
          <li key={i}>
            <div>{iMainInfo.key}</div>
            <div>{iMainInfo.value}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default MainInfoPanelContent

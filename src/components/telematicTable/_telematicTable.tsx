import './_telematicTable.less'

import React, { FC, useEffect, useState } from 'react'

import { TelematicItemType } from '@/type/type'

import { DateTime } from 'luxon'

type TelematicTableProps = {
  telematicResult: TelematicItemType[]
  maxDate: string
  minDate: string
}

const TelematicTable: FC<TelematicTableProps> = ({ telematicResult, maxDate, minDate }): JSX.Element => {
  const [telematicResultFiltered, setTelematicResultFiltered] = useState<TelematicItemType[]>()

  useEffect(() => {
    if (telematicResult) {
      const arr: TelematicItemType[] = telematicResult.filter((item) =>
        checkDatePeriod(minDate, maxDate, item.activationDate) ? item : null,
      )
      if (arr) setTelematicResultFiltered(arr)
    }
  }, [telematicResult])
  return telematicResultFiltered && telematicResultFiltered.length ? (
    <div className="telematicTable f">
      <div>
        <p className="telematicTableHeader">Время и дата сигнала</p>
        <ul className="fc">
          {telematicResultFiltered.map((i: TelematicItemType) => (
            <li key={i.activationDate} className="telematicTableItem telematicTableItemSmall">
              {getFormattedDate(i.activationDate)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="telematicTableHeader">Количество срабатываний</p>
        <ul className="fc">
          {telematicResultFiltered.map((i: TelematicItemType) => (
            <li key={i.sequenceNumber} className="telematicTableItem telematicTableItemBold">
              {i.sequenceNumber}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="telematicTableHeader">Пробег до сигнала, км</p>
        <ul className="fc">
          {telematicResultFiltered.map((i: TelematicItemType) => (
            <li key={i.odometer} className="telematicTableItem">
              {i.odometer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <></>
  )
  function getFormattedDate(dateStr: string) {
    return DateTime.fromISO(dateStr).toFormat('dd.MM.yyyy HH:mm:ss')
  }

  function checkDatePeriod(minDateValue: string, maxDateValue: string, currentDateValue: string) {
    const endTime = new Date(maxDateValue)
    endTime.setDate(endTime.getDate() + 1)
    endTime.setSeconds(endTime.getSeconds() - 1)
    return new Date(currentDateValue) >= new Date(minDateValue) && new Date(currentDateValue) <= new Date(endTime)
  }
}

export default TelematicTable

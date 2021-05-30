import React, { FC, useMemo } from 'react'

import { useDispatch } from 'react-redux'

import { DateTime } from 'luxon'

import c from 'clsx'

import Button from '@/components/button'
import File from '@/components/svg/fileOutlinedIcon'

import * as telematicHistoryActions from '@/store/action/telematicHistory'

import { CarCardModel } from '@/type/model'
import { CarState } from '@/type/state'

import { ParameterPanelContent as ParameterContent } from './parameter'

type TelematicRecordPanelContentProps = {
  TelematicRecord: CarCardModel | null
  Car: CarState['entity']
}

const TelematicRecordPanelContent: FC<TelematicRecordPanelContentProps> = ({
  Car,
  TelematicRecord,
}): JSX.Element | null => {
  if (!TelematicRecord) return null
  const dsp = useDispatch()
  const maxValue = useMemo(() => DateTime.fromJSDate(new Date()).toUTC().toString(), [])
  const minValue = useMemo(() => DateTime.fromJSDate(new Date()).minus({ month: 1 }).toUTC().toString(), [])
  const [telematigRecordIsOpen, setTelematigRecordIsOpen] = React.useState<Array<boolean>>([])
  const telematicRecordList = [
    {
      key: 'onboardPowerVoltage',
      text: 'Напряжение бортовой сети, V (CAN)',
    },
    {
      key: 'fuelLevel',
      text: 'Уровень топлива, л (CAN)',
    },
    {
      key: 'engineOilPressure',
      text: 'Давление масла в двигателе, кПа (CAN)',
    },
    {
      key: 'coolantTemp',
      text: 'Температура охлаждающей жидкости ºС (СAN)',
    },
    {
      key: 'maxRpm',
      text: 'Максимальные обороты двигателя за предыдущий период',
    },
  ]
  React.useEffect(() => {
    setTelematigRecordIsOpen(telematicRecordList.map(() => false))
  }, [])
  return (
    <div className="TelematicRecordPanelContent">
      <div className="statusInfoContainer margin-bottom">
        <div className="grey fs13 margin-bottom">
          Последнее обновление
          {TelematicRecord?.dateCreated
            ? ` ${DateTime.fromISO(TelematicRecord.dateCreated).toFormat('dd-MM-yyyy HH:mm')}`
            : ''}
        </div>
        <ul className="statusContainer">
          {telematicRecordList.map((iTelematicRecord, telematicRecordId) => {
            return (
              <div
                key={iTelematicRecord.text}
                className={c(
                  !TelematicRecord[iTelematicRecord.key as keyof CarCardModel] && 'disabled',
                  'margin-bottom-s',
                )}
              >
                <div className="f-spaceBetween-center margin-bottom-s">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <div className="f-spaceBetween-center" style={{ width: '50%' }}>
                    <span className="fs18">{iTelematicRecord.text}</span>
                    <span className="fs18 bold">{TelematicRecord[iTelematicRecord.key] ?? '-'}</span>
                  </div>

                  <Button
                    className="fs13 f-center-center"
                    type="submit"
                    onClick={() => {
                      getTelematicHistory(iTelematicRecord.key as keyof CarCardModel)
                      const buff = [...telematigRecordIsOpen]
                      buff[telematicRecordId] = !telematigRecordIsOpen[telematicRecordId]
                      setTelematigRecordIsOpen([...buff])
                    }}
                  >
                    <File className="margin-left-xxs-em margin-right-xxs-em" />
                    <span className="margin-right-xxs-em">история</span>
                  </Button>
                </div>
                <div>
                  <ParameterContent
                    initialValues={{ maxValue, minValue }}
                    telemanticKey={iTelematicRecord.key}
                    isOpen={telematigRecordIsOpen[telematicRecordId]}
                  />
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )

  function getTelematicHistory(name: keyof CarCardModel) {
    if (!Car?.uuid) return

    dsp(
      telematicHistoryActions.getOne(
        {
          carUuid: Car.uuid,
          body: {
            [name]: {
              maxValue,
              minValue,
            },
          },
        },
        function onSuccess() {
          dsp(telematicHistoryActions.set({ active: name }))
        },
      ),
    )
  }
}

export default TelematicRecordPanelContent

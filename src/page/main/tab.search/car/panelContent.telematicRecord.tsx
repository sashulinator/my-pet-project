import './panelContent.telematicRecord.less'

import React, { FC, useMemo } from 'react'

import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

import { DateTime } from 'luxon'

import c from 'clsx'

import Button from '@/components/button'
import File from '@/components/svg/fileOutlinedIcon'
import Key from '@/components/svg/keyOutlinedIcon'
import Accumulator from '@/components/svg/accumulatorOutlinedIcon'
import Airbag from '@/components/svg/airbagOutlinedIcon'
import Coolant from '@/components/svg/coolantOutlinedIcon'
import Generator from '@/components/svg/generatorOutlinedIcon'
import BrakeFluid from '@/components/svg/brakeFluidOutlinedIcon'
import LampStatus from '@/components/svg/lampStatusOutlinedIcon'

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
      key: 'ignitionStatus',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <Key {...props} />,
      text: 'Зажигание (клемма +15)',
    },
    {
      key: 'powerStatus',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <Accumulator {...props} />,
      text: 'Питание (клемма +30)',
    },
    {
      key: 'airbagFired',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <Airbag {...props} />,
      text: 'Сигнализатор о срабатывании подушки безопасности (CAN)',
    },
    {
      key: 'coolantLevelLow',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <Coolant {...props} />,
      text: 'Статус сигнализатора «Низкий уровень охлаждающей жидкости» (CAN)',
    },
    {
      key: 'generatorMalfunction',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <Generator {...props} />,
      text: 'Статус сигнализатора «Неисправность генератора» (CAN)',
    },
    {
      key: 'breakFluidLowLevel',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <BrakeFluid {...props} />,
      text: 'Сигнализатор «Низкий уровень тормозной жидкости»',
    },
    {
      key: 'lamp624',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <LampStatus {...props} />,
      text: 'Лампа неисправности "Внимание" (CAN)',
    },
    {
      key: 'lamp1213',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <LampStatus {...props} />,
      text: 'Лампа неисправности "MIL" (CAN)',
    },
    {
      key: 'lamp623',
      icon: (props: React.PropsWithChildren<{ className: string }>) => <LampStatus {...props} />,
      text: 'Лампа неисправности "Критическая неисправность" (CAN)',
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
                  <Link className="f-left-center" to="#">
                    <iTelematicRecord.icon className="primary fs28 margin-right-s" />
                    <span className="fs18">{iTelematicRecord.text}</span>
                  </Link>
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

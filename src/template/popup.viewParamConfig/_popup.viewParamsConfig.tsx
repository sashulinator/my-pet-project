import './_popup.viewParamsConfig.less'
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react'

import { useSelector } from 'react-redux'

import { CAR_PARAMS, CAR_PARAMETER, CLIENT_PARAMS, PERIODS, MALFUNCTIONS } from '@/constant/lastTelemetry'

import Portal from '@/components/popup/_popup'

import { ParamsConfigState, RootState } from '@/type/state'

import { LeftField } from './fieldComponent'

type PopupSaveTemplateProps = {
  stateRef?: React.MutableRefObject<undefined | boolean>
  setStateRef?: React.MutableRefObject<undefined | ((v: boolean) => void)>
}

const PopupSaveTemplate: FC<PopupSaveTemplateProps> = ({ stateRef, setStateRef }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)

  const { entity } = paramsConfigState

  stateRef = stateRef || { current: undefined }
  setStateRef = setStateRef || { current: undefined }

  stateRef.current = isOpen
  setStateRef.current = setIsOpen

  const isCar = entity?.configType === 'CAR'

  const lastTelemetry = entity?.params?.carParams?.lastTelemetry
  const clientParams = entity?.params?.clientParams
  const carParams = entity?.params?.carParams
  const carParameter = entity?.params?.carParams?.carParameter

  return (
    <>
      <Portal
        title={entity?.name || ''}
        onClose={() => {
          setIsOpen(false)
        }}
        isOpen={isOpen}
        top
      >
        <div className="paramConfigWrapper f">
          <div className="vehicle">
            <h2>{isCar ? 'ТО' : 'Клиент'}</h2>
            <div className="listWrapper">
              <ul>
                {Object.entries(CLIENT_PARAMS).map(([k, v]) => {
                  const value = clientParams?.[k as keyof typeof clientParams]

                  return <LeftField key={k} label={v.label} value={value} colon />
                })}
                {Object.entries(CAR_PARAMS).map(([k, v]) => {
                  const value = carParams?.[k as keyof typeof carParameter]

                  return <LeftField key={k} label={v.label} value={value} colon />
                })}
                {Object.entries(CAR_PARAMETER).map(([k, v]) => {
                  const value = carParameter?.[k as keyof typeof carParameter]

                  return <LeftField key={k} label={v.label} value={value} colon />
                })}
              </ul>
            </div>
          </div>
          {isCar && (
            <div className="params fc">
              <h2>Параметры</h2>
              <div className="listWrapper">
                <ul>
                  {Object.entries(MALFUNCTIONS).map(([k, v]) => {
                    if (!lastTelemetry?.[k as keyof typeof lastTelemetry]) return null

                    return <LeftField key={k} label={v.label} value={<v.icon />} />
                  })}
                  {Object.entries(PERIODS).map(([k, v]) => {
                    return (
                      <LeftField key={k} label={v.label} value={lastTelemetry?.[k as keyof typeof lastTelemetry]} />
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Portal>
    </>
  )
}

export default PopupSaveTemplate

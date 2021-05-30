import './parameter.less'

import React, { FC } from 'react'

import { useDispatch } from 'react-redux'

import { DateTime } from 'luxon'

import { Form, Field } from 'react-final-form'

import { REDUX_API_MIDDLEWARE } from '@savchenko91/rc-redux-api-mw'

import Chart from 'chart.js'

import ChartWrapper from '@/components/chartWrapper/_chartWrapper'
import Button from '@/components/button'
import DatePicker from '@/components/datepicker/_datepicker'
import TelematicTable from '@/components/telematicTable/_telematicTable'

import { Period, TelematicsParamsType } from '@/type/type'
import { GET_ONE } from '@/store/constant/telematicHistory'

type ParameterProps = {
  initialValues: Period
  telemanticKey: string
  isOpen: boolean
}

const TelematicsParams: TelematicsParamsType<boolean> = {
  isAirbagFiredHistory: true,
  isBreakFluidLowLevelHistory: true,
  isCoolantLevelLowHistory: true,
  isGeneratorMalfunctionHistory: true,
  isLamp1213History: true,
  isLamp623History: true,
  isLamp624History: true,
}

export const ParameterPanelContent: FC<ParameterProps> = ({
  initialValues,
  telemanticKey,
  isOpen,
}): JSX.Element | null => {
  const [telematicData, setTelematicData] = React.useState([])
  const [telematicResult, setTelematicResult] = React.useState([])

  const dispatch = useDispatch()
  const [graphController, setGraphController] = React.useState<null | Chart>(null)
  React.useEffect(() => {
    if (graphController && graphController.data.datasets) {
      graphController.data.datasets[0].data = telematicData?.map(
        (soloData: { value: number; DateTime: string }) => soloData.value,
      )
      graphController.data.labels = telematicData?.map((soloData: { value: number; createdAt: string }) =>
        DateTime.fromISO(soloData.createdAt).toFormat('dd-MM-yyyy'),
      )

      graphController.update()
    }
  })
  React.useEffect(() => {
    if (isOpen) {
      getInfo(initialValues)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChangeGraphController = (graphControllerFunction: Chart) => {
    setGraphController(graphControllerFunction)
  }

  return (
    <div className="ParameterPanelContent">
      <div>
        <Form<Period>
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit} className="fc formParameter">
              <div className="fs16 f margin-bottom-s margin-top-xs">
                <div className="f-left-center margin-right-s nowrap">Дата подключения</div>
                <Field name="minValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center margin-right-s">
                      <DatePicker
                        maxDate={form.getFieldState('maxValue')?.value as string}
                        clearIcon={null}
                        {...input}
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="maxValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center margin-right">
                      <DatePicker {...input} clearIcon={null} />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className="formField f-center-center">
                  <Button type="submit" className="fs11">
                    Применить
                  </Button>
                </div>
              </div>
              <div className="f telematicFormParamsBlock">
                <ChartWrapper handleChangeGraphController={handleChangeGraphController} />
                <TelematicTable
                  telematicResult={telematicResult}
                  maxDate={form.getFieldState('maxValue')?.value as string}
                  minDate={form.getFieldState('minValue')?.value as string}
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )

  async function getInfo(searchValues: { maxValue: string; minValue: string }) {
    const someHistoty = `${telemanticKey}History`
    const carUUID = window.location.href.split('/').reverse()[0]

    await dispatch({
      type: REDUX_API_MIDDLEWARE,
      stageActionTypes: GET_ONE,
      url: `/api/telematics-records/${carUUID}`,
      method: 'post',
      body: { [telemanticKey]: searchValues, ...TelematicsParams },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess({ body }: any) {
        setTelematicData(body[telemanticKey] ?? null)
        setTelematicResult(body[someHistoty] ?? null)
      },
    })
  }

  function onSubmit(v: Period) {
    getInfo(v)
  }
}

export default ParameterPanelContent

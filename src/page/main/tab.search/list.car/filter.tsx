/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect, useMemo, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { Form, Field } from 'react-final-form'

import Collapse, { Panel } from 'rc-collapse'

import Button from '@/components/button'
import DownloadIcon from '@/components/svg/downloadFilledIcon'
import Select from '@/components/select'
import Input from '@/components/newInput'
import CheckboxButton from '@/components/checkboxButton'

import MALFUNCTIONS from '@/constant/lastTelemetry'

import motion from '@/helper/animation'

import * as paramsConfigActions from '@/store/action/paramsConfig'
import * as referencesActions from '@/store/action/valuesCatalog'

import FilterHeader from '@/template/collapseHeader/_collapseHeader'

import { CarFilter, CarState, ParamsConfigState, RootState, ValuesCatalogState } from '@/type/state'

import { ListManager } from '@/util/listManager'

import PopupSaveTemplate from '../popup.saveTemplate'

type CarSearchFilterProps = {
  initialValues: CarState['filter']
  onSubmit: (v: CarFilter) => void
  listManager: ListManager
}

const CarSearchFilter: FC<CarSearchFilterProps> = ({ onSubmit, initialValues, listManager }): JSX.Element => {
  const dsp = useDispatch()

  const setPopupSaveTemplateOpenRef = useRef<undefined | ((v: boolean) => void)>(undefined)

  const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)
  const valuesCatalogState = useSelector((s: RootState): ValuesCatalogState => s.valuesCatalogState)
  const { list } = paramsConfigState

  useEffect(getParamsConfig, [])
  useEffect(getValuesCatalog, [])

  const issueYear = useMemo(() => {
    const years = valuesCatalogState.entity?.catalogGroupByParameterType?.ISSUE_YEAR || []
    return years
      .sort()
      .map((n) => parseInt(n, 10))
      .map((item) => item.toString())
      .map((value) => ({ value, label: value }))
  }, [valuesCatalogState.entity])

  return (
    <>
      <Form<Partial<CarFilter>>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => {
          return (
            <form onSubmit={handleSubmit} className="fc-center-center">
              <PopupSaveTemplate
                setStateRef={setPopupSaveTemplateOpenRef}
                params={{ carParams: form.getState().values }}
              />
              <div className="fieldRow fs18 margin-top">
                <Field name="paramConfigId">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Select
                        {...input}
                        wide
                        placeholder="Выбрать из шаблона"
                        loading={paramsConfigState.loading.refreshList}
                        onChange={(v) => {
                          input.onChange(v)

                          const paramConfig = list?.find((i) => String(i.id) === String(v))

                          if (paramConfig) {
                            form.initialize(({
                              paramConfigId: v,
                              ...paramConfig.params?.carParams,
                            } as unknown) as CarFilter)
                          } else {
                            form.initialize({ paramConfigId: undefined } as CarFilter)
                          }
                        }}
                        options={getTemplateOptions()}
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="fieldRow fs18">
                <Field name="carParameter.stateNumber">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Input {...input} clearable type="text" id="carParameter.stateNumber" placeholder="Гос. номер" />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className="fieldRow fs18">
                <Field name="brand">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Select
                        {...input}
                        wide
                        placeholder="Марка"
                        onChange={(v) => {
                          form.resetFieldState('model')
                          input.onChange(v)
                        }}
                        options={getBrand()}
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field name="model">
                  {({ input, meta }) => (
                    <div className="formField f-center-center" key={JSON.stringify(form.getFieldState('brand'))}>
                      <Select
                        key={JSON.stringify(form.getState().values)}
                        {...input}
                        wide
                        placeholder="Модель"
                        options={getModel()}
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className="fieldRow fs18">
                <Field name="carParameter.issueYear.minValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Select {...input} wide placeholder="Год выпуска (min)" options={issueYear} />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="carParameter.issueYear.maxValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Select {...input} wide placeholder="Год выпуска (max)" options={issueYear} />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="fieldRow fs18">
                <Field name="regionId">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Input
                        {...input}
                        type="text"
                        id="regionId"
                        placeholder="Регион нахождения  kjhgfkhgkjhgkjhgkj jhgkjhgjh"
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="vin">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Input {...input} type="text" placeholder="VIN заводской (ПТС)" />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="fieldRow fs18">
                <Field name="lastTelemetry.odometer.minValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Input {...input} type="text" id="lastTelemetry.odometer.minValue" placeholder="Пробег (min)" />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="lastTelemetry.odometer.maxValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <Input {...input} type="text" id="lastTelemetry.odometer.maxValue" placeholder="Пробег (max)" />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="f-left-center wrap margin-bottom-s">
                <Collapse
                  className="filterCollapse wrap"
                  // onChange={() => changeCollapseActiveKey()}
                  // activeKey={clientState.filterCollapseActiveKeys}
                  // defaultActiveKey="main"
                  openMotion={motion}
                >
                  <Panel
                    // key="main"
                    header={<FilterHeader title="Дополнительно" className="primary fs30" noArrow />}
                    headerClass="filterCollapseHeader"
                  >
                    <div className="fc-center-center wrap">
                      <div className="fieldRow fs18  margin-top">
                        <Field name="lastTelemetry.ignitionStatus" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="ignitionStatus"
                                placeholder={MALFUNCTIONS.ignitionStatus.label}
                                wide
                                type="checkbox"
                                {...input}
                              />
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.lamp624" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="attentionStatus"
                                wide
                                type="checkbox"
                                placeholder={MALFUNCTIONS.attentionStatus.label}
                                {...input}
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.lamp1213" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                placeholder={MALFUNCTIONS.mil.label}
                                wide
                                id="mil"
                                type="checkbox"
                                {...input}
                              />
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.lamp623" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="criticalFault"
                                type="checkbox"
                                wide
                                {...input}
                                placeholder={MALFUNCTIONS.criticalFault.label}
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.airbagFired" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="airbagFired"
                                type="checkbox"
                                wide
                                {...input}
                                placeholder={MALFUNCTIONS.airbagFired.label}
                              />
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.breakFluidLowLevel" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="breakFluidLowLevel"
                                type="checkbox"
                                wide
                                {...input}
                                placeholder={MALFUNCTIONS.breakFluidLowLevel.label}
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.coolantLevelLow" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="coolantLevelLow"
                                type="checkbox"
                                wide
                                {...input}
                                placeholder={MALFUNCTIONS.coolantLevelLow.label}
                              />
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.generatorMalfunction" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="generatorMalfunction"
                                type="checkbox"
                                wide
                                {...input}
                                placeholder={MALFUNCTIONS.generatorMalfunction.label}
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.powerStatus" type="checkbox">
                          {({ input }) => (
                            <div className="formField f-center-center">
                              <CheckboxButton
                                id="powerStatus"
                                type="checkbox"
                                wide
                                {...input}
                                placeholder={MALFUNCTIONS.powerStatus.label}
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.remainingMileage.minValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.remainingMileage.minValue"
                                placeholder="Остаток пробега до ТО (min)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.remainingMileage.maxValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.remainingMileage.maxValue"
                                placeholder="Остаток пробега до ТО (max)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.onboardPowerVoltage.minValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.onboardPowerVoltage.minValue"
                                placeholder="Напряжение сети (min)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.onboardPowerVoltage.maxValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.onboardPowerVoltage.maxValue"
                                placeholder="Напряжение сети (max)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.fuelLevel.minValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.fuelLevel.minValue"
                                placeholder="Уровень топлива (min)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.fuelLevel.maxValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.fuelLevel.minValue"
                                placeholder="Уровень топлива (max)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.engineOilPressure.minValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.engineOilPressure.minValue"
                                placeholder="Давление масла в двигателе (min)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.engineOilPressure.maxValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.engineOilPressure.maxValue"
                                placeholder="Давление масла в двигателе (max)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.coolantTemp.minValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.coolantTemp.minValue"
                                placeholder="t охлаждающей жидкости (min)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.coolantTemp.maxValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.coolantTemp.maxValue"
                                placeholder="t охлаждающей жидкости (max)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="fieldRow fs18">
                        <Field name="lastTelemetry.fuelConsumption.minValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.fuelConsumption.minValue"
                                placeholder="Потребление топлива (min)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                        <Field name="lastTelemetry.fuelConsumption.maxValue">
                          {({ input, meta }) => (
                            <div className="formField f-center-center">
                              <Input
                                {...input}
                                type="text"
                                id="lastTelemetry.fuelConsumption.maxValue"
                                placeholder="Потребление топлива (max)"
                              />
                              {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
              <div className="f-left-center wrap margin-top-s fs18">
                <Button type="submit" color="primary">
                  Искать
                </Button>
                <Button
                  color="primary"
                  type="button"
                  style={{ marginLeft: '12px' }}
                  onClick={() => {
                    listManager.reset()
                    form.initialize({ paramConfigId: undefined } as CarFilter)
                  }}
                >
                  Очистить
                </Button>
                <Link
                  to="#"
                  className="f nowrap margin-left"
                  onClick={() => setPopupSaveTemplateOpenRef.current?.(true)}
                >
                  <DownloadIcon />
                  Сохранить как шаблон для поиска
                </Link>
              </div>
            </form>
          )
        }}
      />
    </>
  )

  function getTemplateOptions() {
    return list
      .filter((i) => i.configType === 'CAR' && i.isSearchTemplate)
      .map((i) => ({
        value: i.id.toString(),
        label: i.name,
      }))
  }

  function getParamsConfig() {
    dsp(paramsConfigActions.refreshList({ size: 1000, page: 0, isActive: true }))
  }

  function getValuesCatalog() {
    dsp(referencesActions.getBrandModelIssueYear())
  }

  function getBrand() {
    const brand = valuesCatalogState.entity?.catalogGroupByParameterType?.BRAND || []
    return brand.sort().map((value) => ({ value, label: value }))
  }

  function getModel() {
    const model = valuesCatalogState.entity?.catalogGroupByParameterType?.MODEL || []
    return model.sort().map((value) => ({ value, label: value }))
  }
}

export default CarSearchFilter

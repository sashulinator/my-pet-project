/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect, useRef, useState } from 'react'

import { DateTime } from 'luxon'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Form, Field } from 'react-final-form'

import Button from '@/components/button'

import DatePicker from '@/components/datepicker/_datepicker'
import Select from '@/components/select'
import Input from '@/components/input'
// import PlusIcon from '@/components/svg/plusOutlinedIcon'

import DownloadIcon from '@/components/svg/downloadFilledIcon'

import setCSSVariable from '@/hook/useSetCSSVariable/util'

import * as paramsConfigActions from '@/store/action/paramsConfig'

import { PageableRow } from '@/type/type'

import { ClientFilter, ParamsConfigState, RootState } from '@/type/state'

import { ListManager } from '@/util/listManager'

import PopupSaveTemplate from '../popup.saveTemplate'

type ClientFilterListProps = {
  initialValues: Partial<ClientFilter & { paramConfigId: number }> & PageableRow
  onSubmit: (v: ClientFilter) => void
  listManager: ListManager
}

const ClientListFilter: FC<ClientFilterListProps> = ({ onSubmit, initialValues, listManager }): JSX.Element => {
  const dsp = useDispatch()

  const setPopupSaveTemplateOpenRef = useRef<undefined | ((v: boolean) => void)>(undefined)

  const [collapseOverflow, setCollapseOverflow] = useState<'hidden' | 'visible'>('hidden')

  const paramsConfigState = useSelector((s: RootState): ParamsConfigState => s.paramsConfigState)
  const { list } = paramsConfigState

  useEffect(setCSSVariableCollapseOverflow, [collapseOverflow])
  useEffect(getParamsConfig, [])

  return (
    <>
      <Form<ClientFilter>
        initialValues={initialValues}
        onSubmit={onFilterSubmit}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} className="fc-center-center fs18">
            <PopupSaveTemplate
              setStateRef={setPopupSaveTemplateOpenRef}
              params={{ clientParams: formatConnectionDate(form.getState().values) }}
            />
            <div className="fieldRow  margin-top">
              <Field name="paramConfigId">
                {({ input, meta }) => (
                  <div className="formField f-center-center relative">
                    <Select
                      {...input}
                      wide
                      placeholder="Выбрать из шаблона"
                      // disabled={getTemplateOptions().length === 0}
                      onChange={(v) => {
                        input.onChange(v)

                        const paramConfig = list?.find((i) => String(i.id) === String(v))

                        if (paramConfig) {
                          form.initialize(({
                            paramConfigId: v,
                            ...paramConfig.params?.clientParams,
                          } as unknown) as ClientFilter)
                        } else {
                          form.initialize({ paramConfigId: undefined } as ClientFilter)
                        }
                      }}
                      options={buildTemplateOptions()}
                    />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            {/* <div className="fieldRow">
              <Field name="firstName">
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <input {...input} type="text" placeholder="Имя" />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="lastName">
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <input {...input} type="text" placeholder="Фамилия" />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div> */}
            <div className="fieldRow">
              {/* <Field name="phone">
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <input {...input} type="text" placeholder="Телефон" />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field> */}
              <Field name="carCount">
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <Input {...input} type="text" placeholder="Количество ТС" wide />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <div className="fieldRow">
              <Field name="id">
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <Input {...input} type="text" placeholder="UUID клиента" wide />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
              {/* <Field name="email">
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <input {...input} type="text" placeholder="Email" />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field> */}
            </div>
            <div className="fc wrap">
              <div className="f-spaceBetween-center wrap">
                <div className="f-left-center margin-right nowrap margin-bottom-s">Дата подключения</div>
              </div>
              <div className="fieldRow">
                <Field name="connectionDate.minValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <DatePicker
                        maxDate={form.getFieldState('connectionDate.maxValue' as keyof ClientFilter)?.value as string}
                        onCalendarOpen={() => setCollapseOverflow('visible')}
                        onCalendarClose={() => setCollapseOverflow('hidden')}
                        {...input}
                        onChange={(dt) => {
                          if (dt) {
                            form.change('connectionDate.maxValue' as keyof ClientFilter, dt.plus({ day: 1 }).toString())
                          }
                          input.onChange(dt)
                        }}
                        wide
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="connectionDate.maxValue">
                  {({ input, meta }) => (
                    <div className="formField f-center-center">
                      <DatePicker
                        onCalendarOpen={() => setCollapseOverflow('visible')}
                        onCalendarClose={() => setCollapseOverflow('hidden')}
                        minDate={form.getFieldState('connectionDate.minValue' as keyof ClientFilter)?.value as string}
                        wide
                        {...input}
                      />
                      {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="fieldRow">
              <Field name="contractNumber">
                {({ input, meta }) => (
                  <div className="formField f-center-center">
                    <Input {...input} type="text" placeholder="№ Договора" wide />
                    {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                  </div>
                )}
              </Field>
              {/* <div className="formField f-left-center">
                <Link className="f-top-left bold" to="#">
                  <PlusIcon className="fs12" />
                  Добавить дополнительное
                  <br />
                  соглашение
                </Link>
              </div> */}
            </div>
            <div className="f-left-center wrap">
              <Button type="submit" color="primary">
                Искать
              </Button>
              <Button
                color="primary"
                type="button"
                style={{ marginLeft: '12px' }}
                onClick={() => {
                  listManager.reset()
                  form.initialize({ paramConfigId: undefined } as ClientFilter)
                }}
              >
                Очистить
              </Button>
              <Link to="#" className="f nowrap margin-left" onClick={() => setPopupSaveTemplateOpenRef.current?.(true)}>
                <DownloadIcon />
                Сохранить как шаблон для поиска
              </Link>
            </div>
          </form>
        )}
      />
    </>
  )

  function formatConnectionDate(v: ClientFilter): ClientFilter {
    return {
      ...v,
      connectionDate: {
        minValue: v?.connectionDate?.minValue
          ? DateTime.fromISO(v?.connectionDate?.minValue).toFormat('yyyy-MM-dd')
          : '',
        maxValue: v?.connectionDate?.maxValue
          ? DateTime.fromISO(v?.connectionDate?.maxValue).toFormat('yyyy-MM-dd')
          : '',
      },
    }
  }

  function setCSSVariableCollapseOverflow() {
    setCSSVariable(null, 'collapseOverflow', collapseOverflow)
  }

  function onFilterSubmit(v: ClientFilter) {
    onSubmit(formatConnectionDate(v))
  }

  function buildTemplateOptions() {
    return list
      .filter((i) => i.configType === 'CLIENT' && i.isSearchTemplate)
      .map((i) => ({
        value: i.id.toString(),
        label: i.name,
      }))
  }

  function getParamsConfig() {
    dsp(paramsConfigActions.refreshList({ size: 1000, page: 0, isActive: true }))
  }
}

export default ClientListFilter

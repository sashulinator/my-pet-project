import './_one.less'

import React, { FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { sortBy } from 'lodash'
import { Form } from 'react-final-form'
import { FormApi } from 'final-form'
import Skeleton from 'react-loading-skeleton'
import { DateTime } from 'luxon'

import Button from '@/components/button'
import CheckboxButton from '@/components/checkboxButton'
import DatePicker from '@/components/datepicker/_datepicker'
import Field from '@/components/field'
import Input from '@/components/input'
import Select, { objToOptions } from '@/components/select'
import Textarea from '@/components/textarea'

import { MAILING_TYPE } from '@/constant/keyValue'
import ROUTES from '@/constant/routes'

import { required } from '@/helper/validate'

import * as mailingTemplateActions from '@/store/action/mailingTemplate'
import * as paramConfigActions from '@/store/action/paramsConfig'
import * as selector from '@/store/selector'

import { MailingTemplateModel, ParamsConfigModel } from '@/type/model'

const MailingTemplate: FC = (): JSX.Element => {
  const dsp = useDispatch()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const isCreate = ROUTES.MAILING_TEMPLATE_CREATE.isCurrent || ROUTES.MAILING_TEMPLATE_CREATE.isPrevious

  const mailingTemplateState = useSelector(selector.mailingTemplateState)
  const paramsConfigState = useSelector(selector.paramsConfigState)

  const initialValues = useMemo<MailingTemplateModel>(buildInitialValues, [mailingTemplateState.entity])
  const paramComfigList = useMemo(buildParamConfigList, [paramsConfigState.fullActiveList])

  useEffect(getMailingTemplate, [])
  useEffect(getFullActiveParamsConfigList, [])

  let fform: FormApi<MailingTemplateModel>

  return (
    <div className="MailingTemplate scrollableContent wrap">
      <section className="first">
        <h1>{isCreate ? 'Создать шаблон рассылки' : 'Редактировать шаблон рассылки'}</h1>
      </section>
      <section>
        <Form<MailingTemplateModel>
          key={JSON.stringify(initialValues)}
          onSubmit={onSubmit}
          validate={formValidate}
          initialValues={initialValues}
          render={({ handleSubmit, form }) => {
            fform = form

            return (
              <form onSubmit={handleSubmit} className="fc-center-center">
                <div className="fieldRow fs18">
                  <Field name="name" validate={required}>
                    <Input placeholder="Название шаблона" />
                  </Field>
                </div>

                <div className="fieldRow fs18">
                  <Field name="startDate">
                    <DatePicker
                      maxDate={form.getFieldState('endDate')?.value as string}
                      onChange={(dt) => dt && form.change('endDate', dt.plus({ day: 7 }).toString())}
                    />
                  </Field>
                  <Field name="endDate">
                    <DatePicker minDate={form.getFieldState('startDate')?.value} />
                  </Field>
                </div>

                <div className="fieldRow fs18">
                  <div className="formField f-center-center">
                    <Field name="mailingType">
                      <Select allowClear={false} options={objToOptions(MAILING_TYPE)} />
                    </Field>
                  </div>
                </div>

                <div key={JSON.stringify(initialValues)} className="paramConfigList margin-bottom-s f-wrap wide fs18">
                  <CheckboxButton
                    className="checkboxSelectAll margin-right margin-bottom-s"
                    placeholder="Выбрать все события"
                    onChange={selectAllParamsConfigs}
                    disabled={!isParamsConfigLoading() && !paramComfigList.length}
                    checked={isCheckboxAllParamsConfigsChecked()}
                  />
                  {isParamsConfigLoading() ? (
                    <Skeleton className="react-loading-skeleton-checkbox margin-right-s" count={3} />
                  ) : (
                    paramComfigList.map((ParamConfig) => {
                      return (
                        <CheckboxButton
                          className="margin-right-s margin-bottom-s"
                          key={ParamConfig.id}
                          placeholder={ParamConfig.name}
                          onChange={onParamConfigCheckboxChange(ParamConfig)}
                          checked={isParamsConfigChecked(ParamConfig)}
                        />
                      )
                    })
                  )}
                </div>

                <div className="fieldRow fs18">
                  <Field name="text" validate={required}>
                    <Textarea />
                  </Field>
                </div>
                <div className="f wrap fs18">
                  <Button type="submit" color="primary">
                    Сохранить
                  </Button>
                </div>
              </form>
            )
          }}
        />
      </section>
    </div>
  )

  // Requests

  function getMailingTemplate() {
    if (!mailingTemplateState.entity && id && !isCreate) {
      dsp(mailingTemplateActions.get(id))
    }
  }

  function getFullActiveParamsConfigList() {
    dsp(paramConfigActions.refreshFullActiveList())
  }

  // Form

  function buildInitialValues(): MailingTemplateModel {
    const result = !isCreate
      ? mailingTemplateState.entity || {}
      : {
          mailingType: 'AUTOMATIC',
          isActive: true,
          startDate: DateTime.now().toUTC(),
          endDate: DateTime.now().plus({ day: 7 }).toUTC(),
          configs: [],
        }

    return (result as unknown) as MailingTemplateModel
  }

  function onSubmit(values: MailingTemplateModel) {
    const action = mailingTemplateActions[isCreate ? 'create' : 'update']

    dsp(action(values, { onSuccess }))

    function onSuccess() {
      history.push(ROUTES.MAILING_TEMPLATE_LIST.PATH)

      if (isCreate) {
        dsp(mailingTemplateActions.getList(mailingTemplateState.filter))
      }
    }
  }

  type MailingTemplateErrors = Record<keyof Partial<Partial<MailingTemplateModel>>, string>

  function formValidate(v: Partial<MailingTemplateModel>): any {
    const err: Record<string, string> = {}
    const msg = 'Обязательно при "Автоматическом" типе рассылки'

    if (v?.mailingType !== 'AUTOMATIC') return

    if (!v.startDate) err.startDate = msg
    if (!v.endDate) err.endDate = msg

    return err
  }

  // ParamsConfig

  function buildParamConfigList(): ParamsConfigModel[] {
    const res = sortBy(paramsConfigState.fullActiveList, (a) => a.name)
    return (res as unknown) as ParamsConfigModel[]
  }

  function onParamConfigCheckboxChange(ParamConfig: ParamsConfigModel) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const configs = fform?.getState()?.values.configs || []

      const newConfigs = e?.currentTarget?.checked
        ? [...configs, ParamConfig]
        : configs?.filter?.((P) => P.id !== ParamConfig.id)

      fform?.change('configs', newConfigs)
    }
  }

  function isParamsConfigLoading() {
    return paramsConfigState.loading.getList
  }

  function isParamsConfigChecked(ParamConfig: ParamsConfigModel) {
    return !!fform.getState().values?.configs?.find((P) => {
      return P.id?.toString() === ParamConfig.id?.toString()
    })
  }

  function isCheckboxAllParamsConfigsChecked() {
    return !isParamsConfigLoading() && fform.getState().values?.configs?.length === paramComfigList?.length
  }

  function selectAllParamsConfigs(e: React.ChangeEvent<HTMLInputElement>) {
    const newParamsConfigList = e.currentTarget.checked ? paramComfigList : []
    fform?.change('configs', newParamsConfigList)
  }
}

export default MailingTemplate

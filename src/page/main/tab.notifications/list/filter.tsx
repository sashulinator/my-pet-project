/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Form, Field } from 'react-final-form'

import Button from '@/components/button'

import DatePicker from '@/components/datepicker/_datepicker'
import Select from '@/components/select'

import * as configTypeActions from '@/store/action/configTypeCatalog'

import { NotificationFilter, RootState } from '@/type/state'

import { ListManager } from '@/util/listManager'

type NotificationFilterListProps = {
  listManager: ListManager
}

const NotificationFilterList: FC<NotificationFilterListProps> = ({ listManager }): JSX.Element => {
  const dsp = useDispatch()

  const configTypeList = useSelector((s: RootState) => s.configTypeCatalogState)

  useEffect(getParamsConfig, [])

  return (
    <>
      <Form<NotificationFilter>
        initialValues={listManager.state.filter}
        onSubmit={listManager.onFilterChange}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} className="f-left fs18">
            <Field name="configTypeName">
              {({ input }) => (
                <div className="formField margin-right-l">
                  <Select placeholder="Событие" options={getTemplateOptions()} style={{ width: '33rem' }} {...input} />
                </div>
              )}
            </Field>
            <div className="formField f-center-center margin-right-s">Дата создания</div>
            <Field name="startCreatedAtTimestamp">
              {({ input }) => (
                <div className="formField margin-right-s">
                  <DatePicker
                    maxDate={form.getFieldState('endCreatedAtTimestamp' as keyof NotificationFilter)?.value as string}
                    {...input}
                  />
                </div>
              )}
            </Field>
            <Field name="endCreatedAtTimestamp">
              {({ input }) => (
                <div className="formField margin-right-l">
                  <DatePicker
                    {...input}
                    minDate={form.getFieldState('startCreatedAtTimestamp' as keyof NotificationFilter)?.value as string}
                  />
                </div>
              )}
            </Field>

            <Button type="submit">Искать</Button>
          </form>
        )}
      />
    </>
  )

  function getTemplateOptions() {
    return configTypeList.list.map((item) => ({ value: item.name, label: item.name }))
  }

  function getParamsConfig() {
    dsp(configTypeActions.getList())
  }
}

export default NotificationFilterList

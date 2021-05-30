import React, { FC } from 'react'

import { useSelector } from 'react-redux'

import { Form, Field } from 'react-final-form'

import Button from '@/components/button'
import Select from '@/components/select'
import Input from '@/components/input'

import { Option } from 'react-dropdown-now'

import { RootState } from '@/type/state'
import { ConfigTypeCatalogModel } from '@/type/model'

import { PageableRow } from '@/type/type'
import CheckboxButton from '@/components/checkboxButton'

type Filter = PageableRow & {
  isActive?: boolean | string
}

type MailingTemplateFilterProps = {
  onSubmit: (v: Record<string, string>) => void
  initialValues: Filter
}

const MailingTemplateFilter: FC<MailingTemplateFilterProps> = ({ onSubmit, initialValues }): JSX.Element => {
  const list = useSelector((s: RootState): ConfigTypeCatalogModel[] => s.configTypeCatalogState.list)

  initialValues.isActive =
    typeof initialValues.isActive === 'boolean' ? initialValues.isActive : initialValues.isActive === 'true'

  return (
    <Form
      key={JSON.stringify(initialValues)}
      initialValues={initialValues}
      onSubmit={(values) => {
        values.isActive = values.isActive ? 'true' : 'false'
        onSubmit(values)
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="fc-center-center fs18">
          <div className="MailingTemplateFilter filter f-center-center">
            <Field name="name">
              {({ input }) => (
                <div className="formField f-center-center">
                  <Input
                    style={{ width: '33rem' }}
                    className="margin-right"
                    type="text"
                    placeholder="Название шаблона"
                    {...input}
                  />
                </div>
              )}
            </Field>
            <Field name="catalogTypeName">
              {({ input, meta }) => (
                <div className="formField f-center-center margin-right mailingTypeDropdown">
                  <Select
                    placeholder="Тип шаблона"
                    style={{ width: '33rem' }}
                    {...input}
                    options={list?.map(
                      (SoloList): Option => ({ value: SoloList?.name ?? '', label: SoloList?.name ?? '' }),
                    )}
                  />
                  {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="isActive" type="checkbox">
              {({ input }) => (
                <div className="formField f-center-center margin-right">
                  <CheckboxButton className="margin-right-s" type="checkbox" placeholder="Активные" {...input} />
                </div>
              )}
            </Field>
            <Button type="submit" color="primary">
              Искать
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default MailingTemplateFilter

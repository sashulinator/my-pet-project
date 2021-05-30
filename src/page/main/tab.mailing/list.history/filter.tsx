import React, { FC } from 'react'

import { Form, Field } from 'react-final-form'

import cx from 'clsx'

import Button from '@/components/button'
import Datepicker from '@/components/datepicker/_datepicker'

import { PageableRow } from '@/type/type'

import * as parse from '@/helper/parse'

type MailingTemplateFilterProps = {
  onSubmit: (v: Record<string, string>) => void
  initialValues: PageableRow
}

const MailingTemplateFilter: FC<MailingTemplateFilterProps> = ({ onSubmit, initialValues }): JSX.Element => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="fc-center-center fs18">
          <div className="MailingTemplateFilter filter f-center-center">
            <div className="f-center-center margin-right-s nowrap">Период с </div>
            <Field name="startDateRaw" parse={parse.date}>
              {({ input, meta }) => (
                <div
                  className={cx(
                    'formField f-center-center margin-right-s',
                    !meta.pristine || meta.active ? 'white' : 'gray',
                  )}
                >
                  <Datepicker {...input} />
                  {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="endDateRaw" parse={parse.date}>
              {({ input, meta }) => (
                <div
                  className={cx(
                    ' formField f-center-center  margin-right',
                    !meta.pristine || meta.active ? 'white' : 'gray',
                  )}
                >
                  <Datepicker {...input} />
                  {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                </div>
              )}
            </Field>
            <Button type="submit">Искать</Button>
          </div>
        </form>
      )}
    />
  )
}

export default MailingTemplateFilter

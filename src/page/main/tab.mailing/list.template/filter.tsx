import React, { FC } from 'react'

import { Form, Field } from 'react-final-form'

import Button from '@/components/button'
import Input from '@/components/input'

import { PageableRow } from '@/type/type'

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
            <Field name="name">
              {({ input }) => (
                <div className="formField f-center-center">
                  <Input
                    className="margin-right"
                    type="text"
                    placeholder="Название шаблона"
                    style={{ width: '37rem' }}
                    {...input}
                  />
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

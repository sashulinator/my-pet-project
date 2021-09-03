import React, { FC } from 'react'

import { Form, Field } from 'react-final-form'

import Button from '@/components/button'
import Input from '@/components/newInput'

import { PageableRow } from '@/type/type'

type MailingTemplateFilterProps = {
  onSubmit: (v: Record<string, string>) => void
  initialValues: PageableRow
}

const MailingTemplateFilter: FC<MailingTemplateFilterProps> = ({ onSubmit, initialValues }): JSX.Element => {
  return (
    <div>
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
                      type="text"
                      placeholder="Название шаблона"
                      styles={{ focusArea: { width: '37rem' } }}
                      clearable
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
    </div>
  )
}

export default MailingTemplateFilter

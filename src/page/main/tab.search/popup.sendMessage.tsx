import React, { FC, useEffect, useState } from 'react'

import { Form, Field } from 'react-final-form'

import Portal from '@/components/popup/_popup'

import Button from '@/components/button'
import Select from '@/components/select'
import Textarea from '@/components/textarea'
import * as mailingTemplateActions from '@/store/action/mailingTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { MailingTemplateState, RootState } from '@/type/state'

type PopupSendMessageProps = {
  stateRef?: React.MutableRefObject<undefined | boolean>
  setStateRef?: React.MutableRefObject<undefined | ((v: boolean) => void)>
}

const PopupSendMessage: FC<PopupSendMessageProps> = ({ stateRef, setStateRef }): JSX.Element => {
  const dsp = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  stateRef = stateRef || { current: undefined }
  setStateRef = setStateRef || { current: undefined }

  stateRef.current = isOpen
  setStateRef.current = setIsOpen

  const mailingTemplateState = useSelector((s: RootState): MailingTemplateState => s.mailingTemplateState)
  const { list } = mailingTemplateState

  useEffect(getMailingTemplateList, [])

  return (
    <Portal title="Отправить сообщение" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <Form
        // initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit} className="popupSendMessageForm fc-center-center fs18 margin-top">
            <Field name="template">
              {({ input, meta }) => (
                <div className="formField f-center-center margin-bottom">
                  <Select
                    placeholder="Выбрать из шаблона"
                    {...input}
                    wide
                    options={getTemplateOptions()}
                    onChange={(v) => {
                      input.onChange(v)
                      form?.change('text', list.find((m) => String(m.id) === String(v))?.text)
                    }}
                  />
                  {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="text">
              {({ input, meta }) => (
                <div className="formField f-center-center margin-bottom">
                  <Textarea {...input} wide placeholder="Сообщение" />
                  {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="f-left-center wrap">
              <Button type="submit">Отправить</Button>
            </div>
          </form>
        )}
      />
    </Portal>
  )

  function getTemplateOptions() {
    return list.map((i) => ({
      value: i.id,
      label: i.name,
    }))
  }

  function onSubmit() {
    //
  }

  function getMailingTemplateList() {
    dsp(mailingTemplateActions.getList())
  }
}

export default PopupSendMessage

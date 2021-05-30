import React, { FC, useState } from 'react'

import { Form, Field } from 'react-final-form'

import Portal from '@/components/popup/_popup'

import Button from '@/components/button'

export type OnChange = (v: boolean) => void

export type FormRemove = {
  doNotAskOnRemove: boolean
}

export type PopupRemoveProps = {
  stateRef?: React.MutableRefObject<undefined | boolean>
  setStateRef?: React.MutableRefObject<undefined | OnChange>
  onSubmit: (v: FormRemove) => void
}

const PopupRemove: FC<PopupRemoveProps> = ({ stateRef, setStateRef, onSubmit }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  stateRef = stateRef || { current: undefined }
  setStateRef = setStateRef || { current: undefined }

  stateRef.current = isOpen
  setStateRef.current = setIsOpen

  return (
    <Portal title="Вы уверены?" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <Form
        // initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="PopupRemove fc-center-center fs18 margin-top">
            <Field name="doNotAsk">
              {({ input }) => (
                <div className="formField f-center-center margin-bottom">
                  <input
                    className="whiteBg margin-right-s"
                    type="checkbox"
                    {...input}
                    placeholder="VIN заводской (ПТС)"
                  />
                  <span className="white bold">Перестать спрашивать пока не обновлю страницу</span>
                </div>
              )}
            </Field>
            <div className="f-left-center wrap">
              <Button type="submit" className="fs14">
                Удалить
              </Button>
            </div>
          </form>
        )}
      />
    </Portal>
  )
}

export default PopupRemove

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC, useRef } from 'react'

import cx from 'clsx'

import { Form, Field } from 'react-final-form'

import Button from '@/components/button'

import ContentEditable from 'react-contenteditable'

type DialogBottomBlockProps = {
  className?: string
}

const DialogBottomBlock: FC<DialogBottomBlockProps> = ({ className }): JSX.Element => {
  const ref = useRef(null)

  return (
    <div className={cx('DialogBottomBlock horizontalBlock', className)}>
      <div className="f-center wide">
        <div className="messageInput filter f-center-center">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="wrap fs18 f-top">
                <Field name="message">
                  {({ input }) => (
                    <ContentEditable
                      className="textarea margin-right-s margin-top-s"
                      innerRef={ref}
                      html={input.value}
                      tagName="article"
                      {...input}
                    />
                  )}
                </Field>

                <Button className="margin-top-s" type="submit">
                  Отправить
                </Button>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  )

  function onSubmit(v: unknown) {
    // eslint-disable-next-line no-console
    console.log(v)
  }
}

export default DialogBottomBlock

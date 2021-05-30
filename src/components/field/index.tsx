import React from 'react'

import cx from 'clsx'

import { Field, FieldInputProps, FieldProps, FieldRenderProps } from 'react-final-form'

function FieldApp<FieldValue, RP extends FieldRenderProps<FieldValue, T>, T extends HTMLElement = HTMLElement>({
  className,
  children,
  ...props
}: FieldProps<FieldValue, RP, T>): JSX.Element | null {
  checkOneChildern()

  const child = React.Children.only(children)
  if (!React.isValidElement<HTMLInputElement>(child)) return null

  return (
    <Field<FieldValue, RP, T> {...props}>
      {({ input, meta }) => (
        <div className={cx('formField', className)}>
          {React.cloneElement(child, buildNewProps(input))}
          {meta.touched && meta.error && <span className="fieldError">{meta.error}</span>}
        </div>
      )}
    </Field>
  )

  function checkOneChildern() {
    if (React.Children.count(children) > 1) {
      throw Error('У Field должен быть только один ребенок')
    }
  }

  // я пытался без any... честно
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function buildNewProps(inputProps: FieldInputProps<FieldValue, T>): any {
    return {
      ...inputProps,
      onChange(v: FieldValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(child as any).props?.onChange?.(v)
        inputProps?.onChange?.(v)
      },
    }
  }
}

export default FieldApp

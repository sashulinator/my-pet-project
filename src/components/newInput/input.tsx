import React, { useRef } from 'react'
import cx from 'clsx'
import FocusHOC from './focusHOC'
import css from './input.module.css'
import FieldWrapper from './fieldWrapper'
import StateManager from './stateManager'
import CloseIcon from './close'

type ReactInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<Element>, Element>,
  'className' | 'style' | 'onFocus' | 'onBlur'
>

export interface InputProps extends ReactInputProps {
  onFocus: (event?: React.FocusEvent<HTMLElement> | undefined) => void
  onBlur: (event?: React.FocusEvent<HTMLElement> | undefined) => void
  focused?: boolean
  value?: string
  clearable?: boolean
  styles?: {
    input?: React.CSSProperties
    focusArea?: React.CSSProperties
    placeholder?: React.CSSProperties
  }
  classNames?: {
    input?: string
    focusArea?: string
    placeholder?: string
  }
}

const Input: React.FC<InputProps> = (props) => {
  const { focused = false, placeholder, value, onChange, clearable, styles = {}, classNames = {}, ...restProps } = props

  const ref = useRef<HTMLInputElement>(null)

  const { input: inputStyle, ...focusAreaStyles } = styles
  const { input: inputClassName, ...focusAreaClassNames } = classNames

  return (
    <FieldWrapper
      focused={focused}
      filled={Boolean(ref.current?.value || value)}
      placeholder={placeholder}
      styles={focusAreaStyles}
      classNames={focusAreaClassNames}
    >
      <input
        {...restProps}
        className={cx(css.msnd_input, inputClassName)}
        ref={ref}
        onChange={onChange}
        style={inputStyle}
      />
      <StateManager
        element={ref.current}
        onChange={onChange}
        value={value}
        clearable={clearable}
        icon={<CloseIcon className={css.msnd_close_icon} />}
      />
    </FieldWrapper>
  )
}

export default FocusHOC(Input)

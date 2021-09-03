/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import cx from 'clsx'
import React, { useState } from 'react'
import css from './fieldWrapper.module.css'

interface FieldWrapperProps {
  focused: boolean
  filled: boolean
  placeholder?: string
  wide?: boolean
  styles?: {
    focusArea?: React.CSSProperties
    placeholder?: React.CSSProperties
  }
  classNames?: {
    focusArea?: string
    placeholder?: string
  }
}

const FieldWrapper: React.FC<FieldWrapperProps> = (props) => {
  const { children, focused, filled, placeholder, wide, styles = {}, classNames = {} } = props
  const [isMouseDown, setIsMouseDown] = useState<boolean | null>(null)

  return (
    <label
      title={placeholder}
      style={styles?.focusArea}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      className={cx(
        css.field_wrapper,
        isMouseDown !== null && css.msnd_animated,
        wide && css.field_wrapper__wide,
        (focused || isMouseDown) && css.field_wrapper__focused,
        (filled || isMouseDown) && css.field_wrapper__filled,
        classNames.focusArea,
      )}
    >
      <span
        style={styles?.placeholder}
        className={cx(css.msnd_placeholder, isMouseDown !== null && css.msnd_animated, classNames.placeholder)}
      >
        {placeholder}
      </span>
      {children}
    </label>
  )
}

export default FieldWrapper

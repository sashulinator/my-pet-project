/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './index.less'
import './app.less'

import React, { FC, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import cx from 'clsx'

import LoadingIcon from './icons/loading'
import CheckIcon from './icons/check'

type CheckboxButtonAppProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onClick'
> & {
  className?: string
  wide?: boolean
  placeholder?: string
  loading?: boolean
  skeleton?: unknown
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void
}

const CheckboxButtonApp: FC<CheckboxButtonAppProps> = ({
  className,
  wide,
  placeholder,
  style,
  checked,
  onFocus,
  onBlur,
  onClick,
  disabled,
  loading,
  skeleton,
  ...inputProps
}): JSX.Element => {
  const [focused, setFocused] = useState(false)

  const additionalClassNames = cx(
    wide && 'wide',
    checked ? 'checked' : 'unchecked',
    focused && 'focused',
    loading ? 'loading' : 'noloading',
    placeholder ? 'withplaceholder' : 'noplaceholder',
    disabled ? 'disabled' : 'enabled',
  )

  if (skeleton) {
    return <Skeleton className={cx('react-loading-skeleton-checkbox', additionalClassNames)} />
  }

  return (
    <label className={cx('CheckboxButtonApp', className, additionalClassNames)} style={style} onClick={onClick}>
      <input
        type="checkbox"
        {...inputProps}
        disabled={disabled}
        checked={checked}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
      />
      {!loading && <CheckIcon style={{ color: 'white', width: '3rem', height: '3rem' }} />}
      {loading && <LoadingIcon />}
      {placeholder && <span className="placeholder">{placeholder}</span>}
    </label>
  )

  function onInputFocus(event: React.FocusEvent<HTMLInputElement>) {
    setFocused(true)
    onFocus?.(event)
  }

  function onInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    setFocused(false)
    onBlur?.(event)
  }
}

export default CheckboxButtonApp

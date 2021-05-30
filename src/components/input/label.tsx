import React, { VFC, FC, useContext, useState } from 'react'

import cx from 'clsx'

type LabelProps = {
  onFocus?: (event: React.FocusEvent<any>) => void
  onBlur?: (event: React.FocusEvent<any>) => void
  children: (p?: { onFocus: LabelProps['onFocus']; onBlur?: LabelProps['onBlur'] }) => JSX.Element
}

const Label: VFC<LabelProps> = ({ children, onFocus, onBlur }): JSX.Element => {
  if (typeof children !== 'function') throw Error('ahtung')

  const [focused, setFocused] = useState(false)

  const classNames = cx(focused && addPrefix('focused'))

  return (
    <label className={cx('rc-input-wrapper', classNames)}>
      {children({
        onFocus: onFocusInterceptor,
        onBlur: onBlurInterceptor,
      })}
    </label>
  )

  function onFocusInterceptor(e: React.FocusEvent<any>) {
    setFocused(true)
    onFocus?.(e)
  }

  function onBlurInterceptor(e: React.FocusEvent<any>) {
    setFocused(false)
    onBlur?.(e)
  }

  function addPrefix(str: string): string {
    return `${'rc-input'}--${str}`
  }
}

export default Label

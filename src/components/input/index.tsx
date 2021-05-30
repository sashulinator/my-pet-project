/* eslint-disable @typescript-eslint/no-explicit-any */

import './index.less'
import './app.less'

import React, { useRef, useState } from 'react'
import cx from 'clsx'
import useMergedRef from '@react-hook/merged-ref'

import CloseIcon from './icons/close'
import LoadingIcon from './icons/loading'

type InputAppProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref'
> & {
  className?: string
  clearable?: boolean
  onClear?: () => void
  loading?: boolean
  loadable?: boolean
  wide?: boolean
  chameleon?: boolean

  // todo custom icons
}

const InputApp = React.forwardRef<HTMLInputElement, InputAppProps>(
  (
    {
      wide,
      className,
      clearable = true,
      chameleon,
      onChange,
      style,
      value,
      loading,
      loadable,
      onFocus,
      onBlur,
      autoComplete = 'off',
      ...inputProps
    },
    ref,
  ) => {
    const refInput = useRef<null | HTMLInputElement>(null)
    const combinedRef = useMergedRef(ref, refInput)

    const [, setUpdate] = useState({})
    const [focused, setFocused] = useState(false)

    const LoadingComponent = loadable || loading ? <LoadingIcon /> : null
    const CloseComponent = clearable ? (
      <CloseIcon onClick={clear} className={cx(!value && !refInput.current?.value && 'invisible')} />
    ) : null

    const additionalClassNames = cx(focused && 'InputApp--focused', wide && 'wide', chameleon && 'chameleon')

    return (
      <label className={cx('InputApp', className, additionalClassNames)} style={style}>
        <input
          ref={combinedRef}
          type="text"
          className="inputText"
          value={value || refInput.current?.value || ''}
          onChange={onInputChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          autoComplete={autoComplete}
          {...inputProps}
        />
        {LoadingComponent || CloseComponent}
      </label>
    )

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setUpdate({})
      onChange?.(e)
    }

    function onInputFocus(event: React.FocusEvent<HTMLInputElement>) {
      setFocused(true)
      onFocus?.(event)
    }

    function onInputBlur(event: React.FocusEvent<HTMLInputElement>) {
      setFocused(false)
      onBlur?.(event)
    }

    function clear() {
      if (!refInput.current) return

      const ev = new Event('input', { bubbles: true })

      refInput.current.value = ''
      setUpdate({})
      refInput.current.dispatchEvent(ev)
      onChange?.((ev as unknown) as React.ChangeEvent<HTMLInputElement>)
    }
  },
)

export default InputApp

import './index.less'

import './app.less'

import React, { FC, useRef, useState } from 'react'

import cx from 'clsx'

// import CloseIcon from './icons/close'
// import LoadingIcon from './icons/loading'

type TextareaAppProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  className?: string
  clearable?: boolean
  onClear?: () => void
  loading?: boolean
  loadable?: boolean
  wide?: boolean

  // todo custom icons
}

const TextareaApp: FC<TextareaAppProps> = ({
  className,
  // clearable = true,
  onChange,
  style,
  value,
  loading,
  onFocus,
  onBlur,
  loadable,
  autoComplete = 'off',
  wide,
  ...textareaProps
}): JSX.Element => {
  const ref = useRef<null | HTMLTextAreaElement>(null)

  const [focused, setFocused] = useState(false)

  // const LoadingComponent = loadable || loading ? <LoadingIcon /> : null
  // const CloseComponent = clearable ? <CloseIcon onClick={clear} className={cx(!value && 'invisible')} /> : null

  return (
    <label className={cx('TextareaApp', className, focused && 'TextareaApp--focused', wide && 'wide')} style={style}>
      <textarea
        ref={ref}
        className="textareaText"
        value={value}
        onChange={onChange}
        onFocus={onTextareaFocus}
        onBlur={onTextareaBlur}
        {...textareaProps}
        autoComplete={autoComplete}
      />
      {/* {LoadingComponent || CloseComponent} */}
    </label>
  )

  function onTextareaFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
    setFocused(true)
    onFocus?.(event)
  }

  function onTextareaBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    setFocused(false)
    onBlur?.(event)
  }

  // function clear() {
  //   if (!ref.current) return

  //   const ev = new Event('textarea', { bubbles: true })

  //   ref.current.value = ''
  //   ref.current.dispatchEvent(ev)
  //   onChange?.((ev as unknown) as React.ChangeEvent<HTMLTextAreaElement>)
  // }
}

export default TextareaApp

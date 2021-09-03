/* eslint-disable react/require-default-props */
import React from 'react'
import useBooleanState from './useStateBoolean'

interface FocusHOCProps {
  onFocus: (event?: React.FocusEvent<HTMLElement> | undefined) => void
  onBlur: (event?: React.FocusEvent<HTMLElement> | undefined) => void
  focused?: boolean
}

export function FocusHOC<P>(
  WrappedComponent: React.ComponentType<P & FocusHOCProps>,
): (props: P & FocusHOCProps) => JSX.Element {
  const ComponentWithExtraInfo = (props: P & FocusHOCProps) => {
    const { focused, onFocus, onBlur } = props

    const [isFocused, setFocus, unsetFocus] = useBooleanState(focused)

    const handleFocus: (event?: React.FocusEvent<HTMLElement> | undefined) => void = (...args) => {
      setFocus()
      onFocus?.(...args)
    }

    const handleBlur: (event?: React.FocusEvent<HTMLElement> | undefined) => void = (...args) => {
      unsetFocus()
      onBlur?.(...args)
    }

    return <WrappedComponent {...props} focused={isFocused} onFocus={handleFocus} onBlur={handleBlur} />
  }

  return ComponentWithExtraInfo
}

export default FocusHOC
